const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add item name"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please add item price"],
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
