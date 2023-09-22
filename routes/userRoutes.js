const express = require("express")

const router = express.Router()
const userController = require("../controllers/usersControllers")

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser)

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.editUser)
  .delete(userController.removeUser)

module.exports = router
