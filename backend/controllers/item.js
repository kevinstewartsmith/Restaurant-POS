const asyncHandler = require("express-async-handler");

const Item = require("../models/item");

/**
 * Get List of Items
 */
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

/**
 * Get One Item
 */
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).json(item);
});

/**
 * Create new Item
 */
const setItem = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  const item = await Item.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    photo: req.body.photo ? req.body.photo : "",
  });

  res.status(200).json(item);
});

/**
 * Update Item
 */
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateItem);
});

/**
 * Delete Item By ID
 */
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await Item.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getItems,
  setItem,
  updateItem,
  getItem,
  deleteItem,
};
