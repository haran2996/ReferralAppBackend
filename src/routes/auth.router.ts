import express from "express";
import { UserModel } from "../schema/users.schema";
import { encodeJwtToken, generateId } from "../util/utils";
import { ReferralModel } from "../schema/referral.schema";

const AuthRouter = express.Router();
AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email?.match(/[\w-\.]+@[\w-]+\.[\w-\.]/)) {
    throw { message: "Invalid Email", status: 400 };
  }
  if (!password) {
    throw { message: "Password is missing", status: 400 };
  }
  const user = await UserModel.findOne({
    email,
    password,
  });
  if (!user) {
    throw { message: "Email or Password is wrong", status: 400 };
  }
  const token = encodeJwtToken({
    ...user,
    password: undefined,
  });
  res.status(200).send({ token });
});
AuthRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, fname, lname, referralCode } = req.body;
    if (!email?.match(/[\w-\.]+@[\w-]+(\.[\w-\.]+)?/)) {
      throw { message: "Invalid Email", status: 400 };
    }
    if (!password) {
      throw { message: "Password is missingl", status: 400 };
    }
    if (!fname) {
      throw { message: "First name is missing", status: 400 };
    }
    if (!lname) {
      throw { message: "Last name is missin", status: 400 };
    }

    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      throw { message: "Email is already registered", status: 400 };
    }
    let referralUser;
    if (referralCode) {
      referralUser = await UserModel.findOne({
        referralCode,
      });
      if (!referralUser) {
        throw { message: "Invalid Referral code", status: 400 };
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
    const result = await newUser.save();
    console.log("successfully created user ", result);
    if (referralCode) {
      const newReferral = new ReferralModel({
        referralPoints: 10,
        referredDate: new Date(),
        referralId: generateId("referral"),
        referredUser: newUser._id,
        referredBy: referralUser._id,
      });
      const referralResult = await newReferral.save();
      console.log("Successfully create referral", referralResult);
    }
    res.status(201).send({ message: "User Added Successfully!!" });
  } catch (err) {
    res.status(err.status || 400).send({ message: err.message });
  }
});
export { AuthRouter };
