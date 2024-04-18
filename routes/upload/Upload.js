const express = require("express");
const router = express.Router();
// const
// require("dotenv").config();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3"); //storage for aws
const multer = require("multer"); //used for file Uploading
const path = require("path");
const s3 = new aws.S3({
  userName: "",
  accessKeyId: "",
  secretAccessKey: "",
  Bucket: "",
  region: "",
});
const uploadsBusinessgallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: "",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
}).array("files", 15);

function checkFileType(file, cb) {
  const filetypes =
    /pdf|doc|docx|ppt|jpeg|jpg|png|gif|mp3|MP3|wav|WAV|wma|audio|mpeg|video|mp4|glb/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mintype = filetypes.test(filetypes.minmetype);
  if (mintype && extname) return cb(null, true);
  else {
    cb("Error:images ,video and notes  only uploded");
  }
}

router.post("/", (req, res) => {
  // console.log(imgurl);
  uploadsBusinessgallery(req, res, (error) => {
    // console.log(req);
    if (error) {
      res.status(400).json({ message: error });
    } else {
      if (req.files == undefined) {
        res.status(400).json({
          message: "Error:No File Selected",
        });
      } else {
        let fileArray = req.files,
          imgurl;
        console.log(fileArray);
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          imgurl = fileArray[i].location;
          key = fileArray[i].key;
          galleryImgLocationArray.push({ imgurl, key });
        }
        // console.log(galleryImgLocationArray);
        res.json({
          data: galleryImgLocationArray,
          message: "Record Saved",
        });
      }
    }
  });
});
module.exports = router;
