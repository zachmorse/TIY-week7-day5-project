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

router.get("/addcar", (req, res) => {
  res.render("addcar");
});

router.post("/addcar", (req, res) => {
  var carData = req.body;
  let newCarEntry = new Car(carData);
  newCarEntry.save().then(() => {
    res.redirect("/");
  });
});

router.get("/updatecar/:id", (req, res) => {
  Car.findById(req.params.id).then(foundCar => {
    res.render("update", { userListing: foundCar });
  });
});

router.post("/updatecar/:id", (req, res) => {
  Car.updateOne({ _id: req.params.id }, req.body)
    .then(updatedCar => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/deletecar/:id", (req, res) => {
  Car.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
