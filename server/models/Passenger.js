import mongoose from "mongoose";

/**
 * Mongoose schema for the Passenger model.
 * @typedef {Object} PassengerSchema
 * @property {string} passengerType - The type of passenger.
 * @property {mongoose.Schema.Types.ObjectId} permentPassenger - The ID of the permanent passenger.
 * @property {mongoose.Schema.Types.ObjectId} temporyPassenger - The ID of the temporary passenger.
 * @property {Date} timestamps - The creation and update timestamps.
 */
const PassengerSchema = new mongoose.Schema(
  {
    passengerType: {
      type: String,
      required: true,
    },
    permentPassenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PermenantPassenger",
    },
    temporyPassenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TemporyPassenger",
    },
  },
  { timestamps: true }
);

//Creating a model
const Passenger = new mongoose.model("Passenger", PassengerSchema);

export default Passenger;
