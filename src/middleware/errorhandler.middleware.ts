import express from "express";

export const ErrorHandleMiddleware = (
  err,
  req: express.Request,
  res: express.Response,
  next,
) => {
  console.log("Unhandled error caught==>", err);
  if (res.headersSent) {
    return next();
  }
  res.status(err.status || 400).send({ message: err.message });
};
