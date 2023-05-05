const asyncHandler = require("express-async-handler");

const Menu = require("../models/menu");

/**
 * Get List of All Menus linked to Restaurant
 */
const getMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({ user: req.body.restaurant });
  res.status(200).json(menus);
});

/**
 * Create new Menu
 */
const setMenu = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
    throw new Error(
      "Please add required fields"
    );
  }

  const menu = await Menu.create({
    name: req.body.name,
    description: req.body.description,
    items: req.body.items ? req.body.logoitems : [],
    restaurant: req.body.restaurant,
  });

  res.status(200).json(menu);
});

/**
 * Update Menu
 */
const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    res.status(400);
    throw new Error("Menu not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updateMenu = await Menu.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateMenu);
});

/**
 * Delete Menu By ID
 */
const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    res.status(400);
    throw new Error("Menu not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await Menu.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMenus,
  setMenu,
  updateMenu,
  deleteMenu,
};
