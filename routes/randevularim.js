const express = require("express");
const { findById } = require("../models/Randevularim");

const router = express.Router();
const Randevularim = require("../models/Randevularim");

//GET BACK ALL THE Randevularim
router.get("/", async (req, res) => {
  try {
    const randevularim = await Randevularim.find();
    res.json(randevularim);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A Randevularim
router.post("/", async (req, res) => {
  const randevu = new Randevularim({
    kuaforid: req.body.kuaforid,
    date: req.body.date,
    address: req.body.address,
  });
  try {
    const savedRandevu = await randevu.save();
    res.json(savedRandevu);
  } catch (err) {
    res.json({ message: err });
  }
});
//SPESIFIC randevu
router.get("/:randevuId", async (req, res) => {
  try {
    const randevu = await Randevularim.findById(req.params.randevuId);
    res.json(randevu);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE Randevularim
router.delete("/:randevuId", async (req, res) => {
  try {
    const removedRandevu = await Randevularim.deleteOne({ _id: req.params.randevuId });
    res.json(removedRandevu);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Randevularim
router.patch("/:randevuId", async (req, res) => {
  try {
    const updatedRandevu = await Randevularim.updateOne(
      { _id: req.params.randevuId },
      { $set: { date: req.body.date } }
    );
    res.json(updatedRandevu);
  } catch (err) {
    res.json({ message: err });
  }
});



module.exports = router;
