const asyncHandler = require("express-async-handler");

const Table = require("../models/table");

/**
 * Get List of All Tables linked to restaurant
 */
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({ restaurant: req.params.id });
  res.status(200).json(tables);
});

/**
 * Create new Table
 */
const setTable = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add required fields");
  }

  const table = await Table.create({
    name: req.body.name,
    status: req.body.status,
    restaurant: req.body.restaurant,
  });

  res.status(200).json(table);
});

/**
 * Update Table
 */
const updateTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    res.status(400);
    throw new Error("Restaurant not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updateTable = await Table.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateTable);
});

/**
 * Delete Table By ID
 */
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);

  if (!table) {
    res.status(400);
    throw new Error("Table not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  await Table.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTables,
  setTable,
  updateTable,
  deleteTable,
};
