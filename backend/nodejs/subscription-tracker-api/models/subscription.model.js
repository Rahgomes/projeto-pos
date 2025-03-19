import mongoose from "mongoose";
import attachSubscriptionHooks from "../hooks/subscription.hooks";
import {
  CURRENCIES,
  FREQUENCIES,
  CATEGORIES,
  STATUSES,
  SUBSCRIPTION_MESSAGES,
  VALIDATION_MESSAGES,
} from "../constants/index.js";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, SUBSCRIPTION_MESSAGES.NAME_REQUIRED],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, SUBSCRIPTION_MESSAGES.PRICE_REQUIRED],
      min: [0, VALIDATION_MESSAGES.PRICE_MIN],
    },
    currency: {
      type: String,
      enum: Object.values(CURRENCIES),
      default: CURRENCIES.USD,
    },
    frequency: {
      type: String,
      enum: Object.values(FREQUENCIES),
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: [true, SUBSCRIPTION_MESSAGES.CATEGORY_REQUIRED],
    },
    paymentMethod: {
      type: String,
      required: [true, SUBSCRIPTION_MESSAGES.PAYMENT_METHOD_REQUIRED],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUSES),
      default: STATUSES.ACTIVE,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: VALIDATION_MESSAGES.START_DATE_PAST,
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: VALIDATION_MESSAGES.RENEWAL_AFTER_START,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

attachSubscriptionHooks(subscriptionSchema);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
