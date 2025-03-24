import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from "./env.js";

const isProduction = NODE_ENV === "production";

const aj = arcjet({
  key: ARCJET_KEY,
  failOpen: true,
  blockResponseStatusCode: 429,
  blockResponseBody:
    "Request blocked due to suspicious activity. Please try again later.",
  characteristics: ["ip.src", "http.headers.user-agent"],
  logLevel: isProduction ? "warn" : "info",
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
    console.warn(`Blocked request from ${ctx.characteristics["ip.src"]}`);
  },
});

export default aj;
