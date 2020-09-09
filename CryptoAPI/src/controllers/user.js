const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.create({
    email,
    password
  });

  res.json({
    user,
    message: "User created successfully"
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email
  });

  if (!user) {
    throw Error("User not found");
  }
  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ user }, "yourSecretKey", {
      expiresIn: "24h"
    });

    res.json({
      user,
      token,
      message: "Successfully logged in."
    });
  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}

module.exports = {
  createUser,
  login,
}