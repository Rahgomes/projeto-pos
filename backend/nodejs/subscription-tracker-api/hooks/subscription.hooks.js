import {
  calculateRenewalDate,
  updateStatusIfExpired,
} from "../utils/subscription.utils";

const attachSubscriptionHooks = (schema) => {
  schema.pre("save", function (next) {
    calculateRenewalDate(this);
    updateStatusIfExpired(this);

    next();
  });
};

export default attachSubscriptionHooks;
