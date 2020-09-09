let mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function setPassword(password) {
  return bcrypt.hashSync(password, 10);
}

// skapa schema, schema styr strukturen och hur data ska se ut i collection
userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
});

// interface mot databas för att CRUDa
let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
