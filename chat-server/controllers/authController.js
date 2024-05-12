const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const { handleErrors } = require("../utils/errorHandler");

const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

const maxAge = 3 * 24 * 60 * 60;

// Function to create token
const createToken = (id) => {
  // creating access token that expires after every 15m
  const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });

  // creating refresh token that expires each day
  const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "2d",
  });
  return { accessToken, refreshToken };
};

// ================== REGISTER A NEW USER
// POST: api/users/register
// UNPROTECTED
module.exports.register = async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
    const avatar = gender === "male" ? boyProfilePic : girlProfilePic;
    const user = await User.create({ name, email, password, gender, avatar });
    const { accessToken, refreshToken } = createToken(user._id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    const formattedUserObject = {
      id: user._id,
      name: user.name,
      emai: user.email,
      gender: user.gender,
      avatar: user.avatar,
    };
    res.status(201).json({
      ...formattedUserObject,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

// ================== LOGIN A REGISTERED USER
// POST: api/users/login
// UNPROTECTED
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) throw new Error("email is empty");
    if (!password) throw new Error("password is empty");
    const user = await User.login(email, password);
    const { accessToken, refreshToken } = createToken(user._id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    const formattedUserObject = {
      id: user._id,
      name: user.name,
      emai: user.email,
      gender: user.gender,
      avatar: user.avatar,
    };
    res.status(200).json({
      ...formattedUserObject,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

// ================== LOGGING OUT USERS
// POST: api/users/logout
// UNPROTECTED
module.exports.logout = (req, res) => {
  try {
    res.cookie("accessToken", "", { maxAge: 0 });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.log("Error while logging out: ", err.message, err.code);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
