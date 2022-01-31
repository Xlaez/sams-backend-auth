const AuthModelSignup = require("../../model/auth/signup");
const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
var tokensecret = process.env.TOKEN_SECRET;

getToken = (user) => {
  jwt.sign({ email: user.email }, tokensecret, {
    expiresIn: 36000,
  });
};

exports.postSignup = async (req, res) => {
  const body = req.body;
  var userInput = await AuthModelSignup.findOne({ email: body.email });
  if (userInput) {
    return res.status(400).send("This user already exists in the database");
  }
  const user = new AuthModelSignup({
    username: body.username,
    email: body.email,
    fullname: body.fullname,
    password: encrypt.hashSync(body.password, 6),
  });
  try {
    user.save();
    var token = getToken(user);
    return res.status(201).json({ accessToken: token, email: user.email });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.postLogin = async (req, res) => {
  const user = await AuthModelSignup.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "User doesn't exist", status: "Fail" });
  }

  var validPassword = encrypt.compareSync(req.body.password, user.password);

  if (!validPassword) {
    return res
      .status(401)
      .json({ message: "Invalid input", accessToken: null });
  }

  var token = getToken(user);

  res.status(200).json({
    message: "User login successful",
    status: "Success",
    username: user.username,
    email: user.email,
    accessToken: token,
  });
};
