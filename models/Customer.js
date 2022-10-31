const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customers", CustomerSchema);
