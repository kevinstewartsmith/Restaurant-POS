const express = require("express");
const router = express.Router();
const {
  getItems,
  updateItem,
  setItem,
  deleteItem,
  getItem,
} = require("../controllers/item");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getItems).post(protect, setItem);
router
  .route("/:id")
  .delete(protect, deleteItem)
  .put(protect, updateItem);
router.route("/:id").get(protect, getItem);
module.exports = router;
