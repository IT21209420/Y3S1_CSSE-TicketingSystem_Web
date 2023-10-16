import mongoose from "mongoose";

const PermenantPassengerSchema = new mongoose.Schema(
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Creating a model
const PermenantPassenger = new mongoose.model(
  "PermenantPassenger",
  PermenantPassengerSchema
);

export default PermenantPassenger;
