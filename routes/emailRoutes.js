const express = require("express");
const emailRouter = express.Router();
const email = require("../models/Email");
const { sendUserMail } = require("../utilis/index");

emailRouter.post("/sendemail", async (req, res) => {
  try {
    console.log(" process.env.__MAIL_USER", process.env.__MAIL_USER);
    const { username, email, message } = req.body;
    console.log(req.body);
    const resp = await sendUserMail(email, {
      message: message,
      username: username,
    });
    res.status(200).json({
      message: "Email send to the USer",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});
module.exports = emailRouter;
