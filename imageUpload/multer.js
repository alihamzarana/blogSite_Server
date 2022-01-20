const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// const dotenv = require("dotenv");
// require("../imageUpload/cloudinary.config");
// dotenv.config();

const storage = new CloudinaryStorage({
  folder: "blogImages",
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [
    {
      width: 500,
      height: 500,
      crop: "limit",
    },
  ],
  cloudinary: cloudinary,
});
const upload = multer({ storage: storage });
module.exports = upload;
