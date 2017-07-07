const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
mongoose.Promise = require("bluebird");
const Car = require("./models/Car");
const port = process.env.PORT || 9000;
const dbURL = "mongodb://localhost:27017/classicCars";
const router = require("./routing/routes.js");

// --- middleware:

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// --- routing section

app.use("/", router);

// --- listener section

app.listen(port, () => {
  console.log(`Server is connected at port ${port}.`);
});
