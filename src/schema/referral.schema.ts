import { Schema, model, Types } from "mongoose";
const ReferralSchema = new Schema(
  {
    refferedUser: {
      type: String,
      required: [true, "Reffered user is required"],
      unique: [true, "User can be referred only once"],
    },
    refferedBy: {
      type: String,
      required: [true, "Reffered user is required"],
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
