const OpenAI = require("openai");
const router = require("express").Router();
const User = require("../models/User");

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

router.post("/chat", async (req, res) => {
  const message = req.body?.message ?? "";

  if (!message) {
    return res.status(200).json({
      status: "error",
      error: "Please enter a message"
    });
  }

  try {
    const result = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.75,
      messages: [{ role: "user", content: message }]
    });

    console.log(result);

    // const botMessage = {
    //   content: result?.data?.choices[0]?.message?.content,
    //   isUser: false
    // };

    res.status(200).json({
      status: "success",
      data: result
    });
  } catch (error) {
    console.log(error);

    if (error?.error?.message) {
      return res.status(200).json({
        status: "error",
        error: error.error.message
      });
    }

    res.status(200).json({
      status: "error",
      error: error
    });
  }
});

module.exports = router;
