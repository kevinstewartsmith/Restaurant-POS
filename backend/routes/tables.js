const express = require("express");
const router = express.Router();
const {
  getTables,
  updateTable,
  setTable,
  deleteTable,
} = require("../controllers/table");

const { protect } = require("../middleware/auth");

router.route("/").post(protect, setTable);
router
  .route("/:id")
  .delete(protect, deleteTable)
  .put(protect, updateTable)
  .get(protect, getTables);

module.exports = router;
