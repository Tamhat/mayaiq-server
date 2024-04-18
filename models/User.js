const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
  },
  firstName: {
    type: String,
    unique: false,
  },
  lastName: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    enum: ["enabled", "disabled"],
    default: "enabled",
  },

  role: {
    type: String,
    enum: ["user", "buyer", "seller", "admin"],
    default: "user",
  },
  location: {
    type: String,
    default: "UnitedState",
  },
  description: {
    type: String,
    default: "A New user",
  },
  img: {
    type: String
  },
  files: [{
    type: String,
  }],
  latitude: {
    type: Number,
    default: 56
  },
  longitude: {
    type: Number,
    default: 56
  }
 
 
});


UserSchema.pre("save", function (next) {
    this.password
      ? bcrypt
          .hash(this.password, 10)
          .then((encrypted) => {
            this.password = encrypted;
          })
  
          .finally(() => {
            next();
          })
      : next();
  });

  
UserSchema.statics.checkPassword = function (pass, hashedPass) {
    return bcrypt.compareSync(pass, hashedPass);
  };


module.exports = mongoose.model("User", UserSchema)
