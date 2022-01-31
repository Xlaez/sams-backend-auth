const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization",
    "accessToken"
  );
  next();
});
app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://default:new_user2@studentform.o0has.mongodb.net/a2Default?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log("it is connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(3000)
