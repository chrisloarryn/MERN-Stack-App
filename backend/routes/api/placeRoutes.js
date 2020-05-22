const router = require("express").Router();
const { check } = require("express-validator");

// Controllers
const placeController = require("./../../controllers/placeController");

router
  .get("/", placeController.getAllPlaces)
  .post(
    "/",
    [
      check("title").not().isEmpty(),
      check("description").isLength({ min: 5 }),
      check("address").not().isEmpty(),
    ],
    placeController.createPlace
  );

router
  .get("/:placeId", placeController.getPlaceById)
  .patch(
    "/:placeId",
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    placeController.updatePlaceById
  )
  .delete("/:placeId", placeController.deletePlaceById);

router.get("/user/:userId", placeController.getPlacesByUserId);

module.exports = router;
