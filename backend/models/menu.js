const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    name: {
      type: String,
      required: [true, "Please add menu name"],
    },
    description: {
      type: String,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);
