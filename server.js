const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const checkoutRoute = require("./routes/checkout");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const emailRoute = require("./routes/emailRoutes");
const chatListRoute = require("./routes/chats");
const openAiRoute = require("./routes/openai");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function run() {
  const app = express();
  const port = process.env.PORT;

  //middleware
  app.use(express.json());
  app.use(require("morgan")("dev"));
  app.use(helmet());
  app.use(morgan("common"));
  app.use(
    cors({
      origin: [
        "http://localhost:4000",
        "http://localhost:3000",
        "https://rainbow-druid-91c001.netlify.app"
      ],
      credentials: true
    })
  );

  app.use(express.static("public"));

  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("[+] Connected to MongoDB successfully!"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

  app.use("/checkout", checkoutRoute);
  app.use("/chat", chatRoute);
  app.use("/auth", authRoute);

  app.use("/user", userRoute);
  app.use("/api/user", require("./routes/user-hk"));
  app.use("/email", emailRoute);
  app.use("/chats", chatListRoute);

  app.use("/upload", require("./routes/upload/Upload"));

  app.use("/openai", openAiRoute);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.get(["/", "/buyerauth", "/sellerauth", "/api/user/login"], (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.setHeader("Content-Type", "text/html", "style/css");
      res.send(data);
    });
  });
}

run().then(() => console.log("[+] Server started successfully!"));
