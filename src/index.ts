import express from "express";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.router";
import { UserRouter } from "./routes/user.router";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { ErrorHandleMiddleware } from "./middleware/errorhandler.middleware";
import cors from "cors";
const app: express.Application = express();
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(
    "mongodb+srv://hariharann96:2@cluster0.tkmxlpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("db connected");
    app.use(AuthMiddleware);
    app.use("/auth", AuthRouter);
    app.use("/user", UserRouter);
    app.use(ErrorHandleMiddleware);
    app.get("/", function (req, res) {
      res.send("Service is up!!");
    });
    app.all("*", (req, res) => {
      res.status(404).send(`Could find ${req.method}:${req.path} route`);
    });
    app.listen(8080, function () {
      console.log("Referral app listening on port 8080!");
    });
  })
  .catch((err) => {
    console.log("unable to connect to db", err);
  });
