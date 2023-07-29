const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("hello world...");
});

mongoose
  .connect(
    `mongodb+srv://tuanpa2k2:${process.env.MONGOO_DB}@mern-website.hnxnyqc.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connect mongoo db success...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is running port: " + port);
});
