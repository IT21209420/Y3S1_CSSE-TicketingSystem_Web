import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 50,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      max: 50,
      required: [true, "email is required"],
    },
    nic: {
      type: String,
      max: 20,
      required: [true, "nic is required"],
    },
    contactNo: {
      type: String,
      max: 10,
      required: [true, "contactNo is required"],
    },
    address: {
      type: String,
      max: 100,
      required: [true, "address is required"],
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
  },
  { timestamps: true }
);

//Creating a model
const Passenger = new mongoose.model("Passenger", PassengerSchema);

export default Passenger;
