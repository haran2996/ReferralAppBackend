import express from "express";
import { decodeJwtToken } from "../util/utils";

export const AuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next,
) => {
  try {
    if (
      req.path.startsWith("/auth") ||
      req.path === "/" ||
      req.method === "OPTIONS"
    ) {
      return next();
    }
    const authHeader = req.headers.authorization;
    if (authHeader?.split(" ")?.[1]) {
      decodeJwtToken(authHeader.split(" ")[1]);
      return next();
    }
  } catch (err) {
    console.log("Error while decoding the token", err);
  }
  return res.status(401).send("Authorization header is missing");
};
