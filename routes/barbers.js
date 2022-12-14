const express = require("express");
const { findById } = require("../models/Barber");

const router = express.Router();
const Barber = require("../models/Barber");

//GET BACK ALL THE BARBERS
router.get("/", async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A BARBER
router.post("/", async (req, res) => {
  const barber = new Barber({
    id: req.body.id,
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    gender: req.body.gender,
    phone: req.body.phone,
    today: req.body.today,
    tomorrow: req.body.tomorrow,
    nextDay: req.body.nextDay,
    
  });
  try {
    const savedBarber = await barber.save();
    res.json(savedBarber);
  } catch (err) {
    res.json({ message: err });
  }
});
//SPESIFIC Barber
router.get("/:barberId", async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.barberId);
    res.json(barber);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE Barber
router.delete("/:barberId", async (req, res) => {
  try {
    const removedBarber = await Barber.deleteOne({ _id: req.params.barberId });
    res.json(removedBarber);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a barber
router.patch("/:barberId", async (req, res) => {
  try {
    const updatedBarber = await Barber.updateOne(
      { _id: req.params.barberId },
      {
        $set: {
          today: req.body.today,
          tomorrow: req.body.tomorrow,
          nextDay: req.body.nextDay,
        }
      }
    );
    res.json(updatedBarber);
  } catch (err) {
    res.json({ message: err });
  }
});

// //Update Multiple barbers
// router.patch("/", async (req, res) => {
//   try {
//     const updatedBarber = await Barber.updateMany(
//       {
//         barbers: {
//           $exists: true,
//         },
//       },
//       {
//         $set: {
//           "barbers.$[].gender": "f",
//         },
//       },
//       {
//         multi: true,
//       });
//     res.json(updatedBarber);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
        
      


module.exports = router;
