import jwt from "jsonwebtoken";
import { v4 } from "uuid";
export const jwtSecretKey = "jwt-token-secter-key";

export const decodeJwtToken = (token) => {
  return jwt.verify(token, jwtSecretKey);
};

export const encodeJwtToken = (details) => {
  return jwt.sign(details, jwtSecretKey, {
    expiresIn: "2h",
  });
};

export const generateId = (prefix) => {
  return `${prefix}_${v4().split("-").join("")}`;
};
