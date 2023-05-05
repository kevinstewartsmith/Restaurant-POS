const asyncHandler = require("express-async-handler");

const Restaurant = require("../models/restaurant");

/**
 * Get List of All Restaurants linked to logged in user
 */
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ user: req.user.id });
  res.status(200).json(restaurants);
});

/**
 * Create new Restaurant
 */
const setRestaurant = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400);
    throw new Error(
      "Please add required fields"
    );
  }

  const restaurant = await Restaurant.create({
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo ? req.body.logo : "",
    user: req.user.id,
  });

  res.status(200).json(restaurant);
});

/**
 * Update Restaurant
 */
const updateRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    res.status(400);
    throw new Error("Restaurant not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (restaurant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updateRestaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateRestaurant);
});

/**
 * Delete Restaurant By ID
 */
const deleteRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    res.status(400);
    throw new Error("Restaurant not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (restaurant.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Restaurant.findByIdAndRemove(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRestaurants,
  setRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
