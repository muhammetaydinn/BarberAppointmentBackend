const express = require("express");
const { findById } = require("../models/Date");

const router = express.Router();
const Date = require("../models/Date");

//GET BACK ALL THE dates
router.get("/", async (req, res) => {
  try {
    const date = await Date.find();
    res.json(date);
  } catch (err) {
    res.json({ message: err });
  }
});


//Update a date
router.patch("/:dateId", async (req, res) => {
  try {
    const updatedDate = await Date.updateOne(
      { _id: req.params.dateId },
      { $set: { date: req.body.date } }
    );
    res.json(updatedDate);
  } catch (err) {
    res.json({ message: err });
  }
});







module.exports = router;


//SUBMITS A date
router.post("/", async (req, res) => {
  const date = new Date({
    date: req.body.date,
  });
  try {
    const savedDate = await date.save();
    res.json(savedDate);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPESIFIC randevu
router.get("/:dateId", async (req, res) => {
  try {
    const date = await Date.findById(req.params.dateId);
    res.json(date);
  } catch (err) {
    res.json({ message: err });
  }
});
/*

//DELETE Randevularim
router.delete("/:randevuId", async (req, res) => {
  try {
    const removedRandevu = await Randevularim.deleteOne({
      _id: req.params.randevuId,
    });
    res.json(removedRandevu);
  } catch (err) {
    res.json({ message: err });
  }
});
*/


