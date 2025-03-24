import aj from "../config/arcjet.js";
import logger from "../config/logger.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      const clientIp =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const reason = decision.reason.toString();

      logger.warn(`Request blocked`, { clientIp, userAgent, reason });

      if (decision.reason.isRateLimit()) {
        res.set("Retry-After", "60");
        return res.status(429).json({
          error:
            "Rate limit exceeded. You have made too many requests in a short period. Please wait a moment and try again.",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected" });
      }

      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (error) {
    logger.error(`Arcjet Middleware Error: ${error.message}`, {
      stack: error.stack,
    });
    next(error);
  }
};

export default arcjetMiddleware;
