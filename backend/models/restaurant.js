const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add restaurant name"],
    },
    description: {
      type: String,
      required: [true, "Please add restaurant description"]
    },
    logo: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
