import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from "./env.js";
import logger from "./logger.js";

const isProduction = NODE_ENV === "production";

const aj = arcjet({
  key: ARCJET_KEY,
  failOpen: true,
  blockResponseStatusCode: 429,
  blockResponseBody:
    "Request blocked due to suspicious activity. Please try again later.",
  characteristics: ["ip.src"],
  logLevel: isProduction ? "warn" : "info",
  log: logger,
  rules: [
    shield({ mode: isProduction ? "LIVE" : "DRY_RUN" }),
    detectBot({
      mode: isProduction ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: isProduction ? "LIVE" : "DRY_RUN",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
  onBlock: (ctx) => {
    logger.warn(`Blocked request from ${ctx.characteristics["ip.src"]}`);
  },
});

export default aj;
