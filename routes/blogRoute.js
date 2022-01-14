const blogController = require("../controller/blogController");
const router = require("express").Router();
const authenticate = require("../middleware/auth");

router.route("/").post(authenticate, blogController.addBlog);

// router .post(('/')authenticate, )
router.get("/", blogController.getAllBlogs);
router.route("/:id").put(blogController.updateBlog);
router.route("/:id").get(blogController.singleBlog);

router.route("/:id").delete(blogController.deleteBlog);

module.exports = router;
