const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  updateRestaurant,
  setRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getRestaurants).post(protect, setRestaurant);
router
  .route("/:id")
  .delete(protect, deleteRestaurant)
  .put(protect, updateRestaurant);

module.exports = router;
