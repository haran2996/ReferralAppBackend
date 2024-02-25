import { Schema, model, Types } from "mongoose";
const ReferralSchema = new Schema(
  {
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Referred user is required"],
      unique: [true, "User can be referred only once"],
    },
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Referred user is required"],
    },
    referralPoints: {
      type: Number,
      required: [true, "Referral points is required"],
    },
    referralId: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    referredDate: {
      type: Date,
      required: [true, "Referral points is required"],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  },
);

export const ReferralModel = model("Referral", ReferralSchema);
