import { Schema, model } from "mongoose";
const UserSchema = new Schema(
  {
    fname: {
      type: String,
      validate: {
        validator: (v: string) => {
          return /^[a-zA-Z]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid  first name!`,
      },
      required: [true, "First name is required"],
    },
    lname: {
      type: String,
      validate: {
        validator: (v: string) => {
          return /^[a-zA-Z]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid last name!`,
      },
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      validate: {
        validator: (v: string) => {
          return /[\w-\.]+@[\w-]+(\.[\w]+)?/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    userId: {
      type: String,
      required: [true, "User Id is required"],
      unique: [true, "User Id must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    referralCode: {
      type: String,
      required: [true, "Referral code is required"],
      unique: [true, "Referral code must be unique"],
    },
  },
  {
    timestamps: true,
    autoCreate: true,
  },
);

export const UserModel = model("User", UserSchema);
