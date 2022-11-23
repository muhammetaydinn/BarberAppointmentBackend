const mongoose = require("mongoose");

const BarberSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required:true
  },
  phone: {
    type: String,
    required: true,
  },
  today: {
    type: Boolean,
    required: true
  },
  tomorrow:
  {
    type: Boolean,
    required: true
  },
  nextDay:
  {
    type: Boolean,
    required: true
  },
  
});

module.exports = mongoose.model("Barbers", BarberSchema);
