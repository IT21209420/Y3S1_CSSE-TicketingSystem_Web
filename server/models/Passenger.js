import mongoose from "mongoose";

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
