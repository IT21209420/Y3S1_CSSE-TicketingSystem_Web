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
      unique: true,
      required: [true, "email is required"],
    },
    nic: {
      type: String,
      max: 20,
      unique: true,
      required: [true, "nic is required"],
    },
    contactNo: {
      type: String,
      max: 10,
      unique: true,
      required: [true, "contactNo is required"],
    },
    address: {
      type: String,
      max: 100,
      required: [true, "address is required"],
    },
    accBalace: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Creating a model
const Passenger = new mongoose.model("Passenger", PassengerSchema);

export default Passenger;
