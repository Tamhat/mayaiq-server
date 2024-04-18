const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email, lastName } = req.body;

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      lastName,
    });
    await user.save();

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   console.log(email, password);
//   try {
//     const user = await User.findOne({ email });
//     if (user.status === "disabled") {
//       return res
//         .status(400)
//         .json({ message: "Contact Support for more Information " });
//     }
//     console.log(user);
//     if (!user) return res.status(400).json({ message: "User not found" });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log(isPasswordValid);
//     if (!isPasswordValid)
//       return res.status(400).json({ message: "Invalid password" });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.json({ user, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error in login. Please try again." });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (existingUser.status === "disabled") {
      return res
        .status(400)
        .json({ message: "Contact Support for more Information " });
    }
    if (!existingUser)
      return res.status(401).json({ message: "user is not registered." });

    const passwordCorrect = User.checkPassword(password, existingUser.password);

    if (!passwordCorrect)
      return res.status(401).json({ message: "Wrong email or password." });
    else {
      const payload = {
        id: existingUser._id,
        fullname: existingUser.fullname,
        email: existingUser?.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.status(200).json({
        data: existingUser,
        token: token,
        userRole: existingUser?.role,
        message: "Login SuccessFull",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
