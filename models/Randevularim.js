const mongoose = require("mongoose");

const RandevularimSchema = mongoose.Schema({
  kuaforid: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Randevularim", RandevularimSchema);
