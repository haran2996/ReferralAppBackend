// lib/app.ts
import express = require("express");

// Create a new express application instance
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
