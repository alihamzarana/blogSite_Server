const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// const dotenv = require("dotenv");
// require("../imageUpload/cloudinary.config");
// dotenv.config();

const storage = new CloudinaryStorage({
  //   folder: "blogImages",
  //   allowedFormats: ["jpg", "png", "jpeg"],
  //   transformation: [
  //     {
  //       width: 100,
  //       height: 100,
  //       crop: "limit",
  //     },
  //   ],
  //   cloudinary: cloudinary,
  cloudinary: cloudinary,
  params: {
    folder: "blogImages",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
