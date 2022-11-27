const mongoose = require("mongoose");

const DateSchema = mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    date1: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Dates", DateSchema);