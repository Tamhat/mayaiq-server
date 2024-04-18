const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//get a user
router.post("/postuser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      user: user
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
    res.status(200).json({
      message: "all User",
      allUsers
    });
  } catch (error) {
    res.status(200).json({
      error: error
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body);
    console.log(UpdateUser);
    res.status(200).json({
      UpdateUser
    });
  } catch (error) {
    res.status(200).json({
      error: error
    });
  }
});

router.put("/accountuserInfo/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { password } = req.body;
    const passwordKey = Object.keys(req?.body);
    console.log("/accountuserInfo", passwordKey);

    if (passwordKey.includes("password")) {
      // password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log(hashedPassword);
      console.log("/accountuserInfo", hashedPassword);
      const UpdateUser = await User.findByIdAndUpdate(req.params.id, {
        password: hashedPassword
      });
      console.log(UpdateUser);
      res.status(200).json({
        UpdateUser,
        message: "Password is updated"
      });
    } else {
      const UpdateUser = await User.findByIdAndUpdate(req.params.id, req.body);
      console.log(UpdateUser);
      res.status(200).json({
        message: "username and email is udpated",
        UpdateUser
      });
    }
  } catch (error) {
    console.log(error);

    res.status(200).json({
      error: error
    });
  }
});

module.exports = router;
