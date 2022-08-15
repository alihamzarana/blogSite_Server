const blogController = require("../controller/blogController");
const router = require("express").Router();
const authenticate = require("../middleware/auth");
const upload = require("../imageUpload/multer");
require("../imageUpload/cloudinary.config");

router
  .route("/")
  .post([authenticate, upload.single("image")], blogController.addBlog);
router.get("/", blogController.getAllBlogs);
router.route("/:id").put([upload.single("image")],blogController.updateBlog);
router.route("/:id").get(blogController.singleBlog);

router.route("/:id").delete(blogController.deleteBlog);

module.exports = router;
