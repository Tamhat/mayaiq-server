const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    fullname: { type: String },
    firstName: {
      type: String,
      unique: false,
    },
    lastName: {
      type: String,
      unique: false,
    },
    role: {
      type: String,
      enum: ["user", "buyer", "seller", "admin"],
      default: "user",
    },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
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
   
  },

  { timestamps: true }
);

userSchema.pre("save", function (next) {
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

userSchema.statics.checkPassword = function (pass, hashedPass) {
  return bcrypt.compareSync(pass, hashedPass);
};

module.exports = mongoose.model("user", userSchema);
