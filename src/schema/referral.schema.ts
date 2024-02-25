import { Schema, model, Types } from "mongoose";
const ReferralSchema = new Schema(
  {
    refferedUser: {
      type: Types.ObjectId,
      required: [true, "Reffered user is required"],
    },
    referralPoints: {
      type: Number,
      required: [true, "Referral points is required"],
    },
    referralId: {
      type: Types.ObjectId,
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
