import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    email: {
      type: String,
      max: 50,
    },
    nic: {
      type: String,
      max: 20,
    },
    contactNo: {
      type: String,
      max: 10,
    },
    address: {
      type: String,
      max: 100,
    },
    accBalance: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    passengerType: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//Creating a model
const Passenger = new mongoose.model("Passenger", PassengerSchema);

export default Passenger;
