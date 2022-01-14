const userController = require("../controller/usercontroller");
const router = require("express").Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);
router.route("/login").post(userController.userLogin);
router
  .route("/:id")
  .get(userController.getSingleUser)
  .delete(userController.deleteUser);

module.exports = router;
