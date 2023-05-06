const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
    name: {
      type: String,
      required: [true, "Please add table name"],
    },
    status: {
      type: String,
      required: [true, "Please add table status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", tableSchema);
