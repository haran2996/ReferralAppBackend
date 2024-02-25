import express from "express";
import { UserModel } from "../schema/users.schema";
import { encodeJwtToken, generateId } from "../util/utils";
import { ReferralModel } from "../schema/referral.schema";

const AuthRouter = express.Router();
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email?.match(/[\w-\.]+@[\w-]+\.[\w-\.]/)) {
    throw new Error("Invalid Email");
  }
  if (!password) {
    throw new Error("Password is missing");
  }
  const user = await UserModel.findOne({
    email,
    password,
  });
  if (!user) {
    throw new Error("Email or Password is wrong");
  }
  const token = encodeJwtToken({
    ...user,
    password: undefined,
  });
  res.status(200).send({ token });
});
AuthRouter.post("/signup", async (req, res) => {
  const { email, password, fname, lname, referralCode } = req.body;
  if (!email?.match(/[\w-\.]+@[\w-]+\.[\w-\.]/)) {
    throw new Error("Invalid Email");
  }
  if (!password) {
    throw new Error("Password is missing");
  }
  if (!fname) {
    throw new Error("First name is missing");
  }
  if (!lname) {
    throw new Error("Last name is missing");
  }

  const user = await UserModel.findOne({
    email,
  });
  if (user) {
    throw new Error("Email is already registered");
  }
  let referralUser;
  if (referralCode) {
    referralUser = await UserModel.findOne({
      referralCode,
    });
    if (!referralUser) {
      throw new Error("Invalid Referral code");
    }
  }
  const userId = generateId("user");
  const newUser = new UserModel({
    email,
    password,
    fname,
    lname,
    userId,
    referralCode: userId,
  });
  await newUser.save();
  if (referralCode) {
    const newReferral = new ReferralModel({
      referralPoints: 10,
      referredDate: new Date(),
      referralId: generateId("referral"),
      refferedUser: newUser.userId,
      refferedBy: referralUser.userId,
    });
    await newReferral.save();
  }
  res.status(201).send("User Added Successfully");
});
export { AuthRouter };
