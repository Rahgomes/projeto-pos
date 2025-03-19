import { RENEWAL_PERIODS, STATUSES } from "../constants";

export const calculateRenewalDate = (subscription) => {
  if (!subscription.renewalDate) {
    subscription.renewalDate = new Date(subscription.startDate);

    subscription.renewalDate.setDate(
      subscription.renewalDate.getDate() +
        RENEWAL_PERIODS[subscription.frequency]
    );
  }
};

export const updateStatusIfExpired = (subscription) => {
  if (subscription.renewalDate < new Date()) {
    subscription.status = STATUSES.EXPIRED;
  }
};
