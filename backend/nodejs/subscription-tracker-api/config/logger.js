import pino from "pino";
import { NODE_ENV } from "./env.js";

const isProduction = NODE_ENV === "production";

const logger = isProduction
  ? pino({ level: "warn" })
  : pino({
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
      level: "debug",
    });

export default logger;
