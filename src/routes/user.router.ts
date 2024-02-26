import express from "express";
import { decodeJwtToken } from "../util/utils";
import { UserModel } from "../schema/users.schema";
import { ReferralModel } from "../schema/referral.schema";
import mongoose from "mongoose";
const UserRouter = express.Router();
UserRouter.get("/", async (req, res) => {
  const authorization = req.headers.authorization?.split(" ")[1];
  const userDetails = decodeJwtToken(authorization);
  const user = await UserModel.findOne({
    id: userDetails.id,
  });
  if (!user) {
    res.status(404).send("User details not found");
  }
  res.status(200).send({ userDetails: user });
});
UserRouter.get("/referrals", async (req, res) => {
  const authorization = req.headers.authorization?.split(" ")[1];
  const userDetails = decodeJwtToken(authorization);
  const referrals = await ReferralModel.aggregate()
    .match({
      referredBy: mongoose.mongo.BSON.ObjectId.createFromHexString(
        userDetails._doc._id,
      ),
    })
    .lookup({
      from: "users",
      as: "referredUserDetails",
      localField: "referredUser",
      foreignField: "_id",
    })
    .exec();
  res.status(200).send({ referrals });
});

export { UserRouter };
