const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

module.exports = {
    sendUserMail: (
        to,
        {
            message = null,
            username = null
        } = {}
    ) => {
        const credentails = {
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.__MAIL_USER,
                pass: process.env.__MAIL_PASS,
            },
        };
        const transporter = nodemailer.createTransport(credentails);
        const contacts = {
            from: "tahirabdullah801@gmail.com",
            to,
        };
        return new Promise((res, rej) => {
            ejs
                .renderFile(path.resolve(__dirname, "../templates/sendUserEmail.ejs"), {
                    username,
                    message,
                })
                .then((doc) => {
                    console.log(doc)
                    const content = { subject: "User Email", html: doc };
                    const emailSending = Object.assign({}, contacts, content);
                    return transporter.sendMail(emailSending);
                })
                .then(() => {
                    res({ message: "Email Send" });
                })
                .catch((error) => {
                    rej(error);
                });
        });
    },

    sendEmail: (
        to,
        {
          email = null,
          password = null,
          // message = null,
          // attachment = null,
          // redirect = process.env.FRONTEND,
        } = {}
      ) => {
        const credentials = {
          service: "gmail",
          secure: true,
          auth: {
            user: process.env.__MAIL_USER,
            pass: process.env.__MAIL_PASS,
          },
        };
        const transporter = nodemailer.createTransport(credentials);
        const contacts = {
          from: "tahirabdullah801@gmail.com",
          to,
          // attachments: attachment,
        };
        return new Promise((res, rej) => {
          ejs
            .renderFile(
              path.resolve(__dirname, "../templates/forgotPassword.ejs"),
              {
                email,
                password,
                // message,
                // redirect,
              }
            )
            .then((doc) => {
              const content = {
                subject: "Totostales",
                html: doc,
              };
              const emailS = Object.assign({}, contacts, content);
              //that is the point where the mail is sending with the credentails
              return transporter.sendMail(emailS);
            })
            .then(() => {
              res({ message: "Email Sent" });
            })
            .catch((err) => rej(err));
        });
      },
}