import express from "express";
const UserRouter = express.Router();
UserRouter.get("/", (req, res) => {});
UserRouter.get("/referrals", (req, res) => {});

export { UserRouter };
