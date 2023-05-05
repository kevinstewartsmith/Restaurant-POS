const express = require("express");
const router = express.Router();
const {
  getMenus,
  updateMenu,
  setMenu,
  deleteMenu,
} = require("../controllers/menu");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getMenus).post(protect, setMenu);
router
  .route("/:id")
  .delete(protect, deleteMenu)
  .put(protect, updateMenu);

module.exports = router;
