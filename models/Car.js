var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema definition:

var carSchema = new Schema({
  vinNumber: {
    type: String,
    default: "unknown"
  },
  make: {
    type: String,
    required: true,
    default: "unknown"
  },
  model: {
    type: String,
    required: true,
    default: "unknown"
  },
  year: {
    type: Number,
    min: 1900,
    max: 2017
  },
  body: {
    bodystyle: {
      type: String,
      enum: [
        "sedan",
        "coupe",
        "convertible",
        "wagon",
        "truck",
        "van",
        "unknown"
      ],
      default: "unknown"
    },
    color: String
  },
  drivetrain: {
    engine: {
      type: String,
      default: "unknown"
    },
    transmission: {
      type: String,
      enum: ["automatic", "manual", "unknown"],
      default: "unknown"
    },
    wheelDrive: {
      type: String,
      enum: ["2WD", "4WD", "AWD"]
    }
  }
});

var Car = mongoose.model("Car", carSchema);
module.exports = Car;
