const express = require("express")

const tourController = require("../controllers/toursControllers")

const router = express.Router()

// router.param("id", tourController.checkId)

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    // tourController.checkBody,
    tourController.createTourModel
  )

// router
//   .route("/model")
//   .post(tourController.createTourModel)

router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(
    // tourController.checkBody,
    tourController.editTourModels
  )
  .delete(tourController.removeTourModel)

module.exports = router
