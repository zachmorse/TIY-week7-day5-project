const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/classicCars";

// database connection:

mongoose.connect(dbURL);

// router:

router.get("/", (req, res) => {
  Car.find()
    .then(foundCars => {
      res.send(foundCars);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post("/addcar", (req, res) => {
  var carData = req.body;
  let newCarEntry = new Car(carData);
  newCarEntry
    .save()
    .then(savedCar => {
      res.send(savedCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/:id", (req, res) => {
  Car.findById(req.params.id)
    .then(foundCar => {
      res.send(foundCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.put("/updatecar/:id", (req, res) => {
  Car.updateOne({ _id: req.params.id }, req.body)
    .then(updatedCar => {
      res.send(updatedCar);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.patch("/updatecar/:id", (req, res) => {
  Car.updateOne({ _id: req.params.id }, req.body).then(patchedCar => {
    res.send(patchedCar);
  });
});

router.delete("/deletecar/:id", (req, res) => {
  Car.deleteOne({ _id: req.params.id })
    .then(() => {
      res.send("Listing Deleted");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
