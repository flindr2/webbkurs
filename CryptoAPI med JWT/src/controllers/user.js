const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(request, response) {
  const user = await userModel
    .create(request.body)
    .catch((err) => response.send(err));

  response.send(user);
}

async function login(request, response) {
  const { email, password } = request.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    throw Error("User not found");
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign( { user }, "MYSECRETKEY", { expiresIn: "24h" });
    response.json({ user, token, message: "You successfully logged in." });
  } else {
    response.status(401).json({ message: "Unauthenticated" });
  }
}

module.exports = { createUser, login };
