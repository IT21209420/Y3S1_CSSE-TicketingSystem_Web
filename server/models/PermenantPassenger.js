import mongoose from "mongoose";

/**
 * Mongoose schema for Permanent Passenger model
 * @typedef {Object} PermenantPassengerSchema
 * @property {string} name - Passenger's name (max 50 characters)
 * @property {string} email - Passenger's email (max 50 characters)
 * @property {string} nic - Passenger's NIC (max 20 characters)
 * @property {string} contactNo - Passenger's contact number (max 10 characters)
 * @property {string} address - Passenger's address (max 100 characters)
 * @property {number} accBalance - Passenger's account balance (default: 0)
 * @property {Array<mongoose.Schema.Types.ObjectId>} transactions - Array of transaction IDs associated with the passenger
 * @property {mongoose.Schema.Types.ObjectId} userId - User ID associated with the passenger
 * @property {Date} createdAt - Timestamp of when the passenger was created
 * @property {Date} updatedAt - Timestamp of when the passenger was last updated
 */
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
