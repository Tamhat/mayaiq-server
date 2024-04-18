const express = require("express");
const List = require("../models/chats");
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  await new List(req.body)
    .save()
    .then((doc) =>
      res.status(200).json({
        data: doc,
        message: "Record Saved",
      })
    )
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
});

router.get("/", async (req, res) => {
  await List.find()
    .then((doc) => {
      res.status(200).json({
        data: doc,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
      });
    });
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const resp = await List.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      data: resp,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resp = await List.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: resp,
      message: "Record deleted",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});


module.exports = router;
