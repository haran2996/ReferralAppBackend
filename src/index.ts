import express from "express";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.router";
import { UserRouter } from "./routes/user.router";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { ErrorHandleMiddleware } from "./middleware/errorhandler.middleware";

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(
    "mongodb+srv://hariharann96:2@cluster0.tkmxlpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("db connected");
    app.use(AuthMiddleware);
    app.use(ErrorHandleMiddleware);
    app.use("/auth", AuthRouter);
    app.use("/user", UserRouter);
    app.get("/", function (req, res) {
      res.send("Service is up!!");
    });
    app.all("*", (req, res) => {
      res.status(404).send(`Could find ${req.method}:${req.path} route`);
    });
    app.listen(8080, function () {
      console.log("Example app listening on port 8080!");
    });
  })
  .catch((err) => {
    console.log("unable to connect to db", err);
  });
