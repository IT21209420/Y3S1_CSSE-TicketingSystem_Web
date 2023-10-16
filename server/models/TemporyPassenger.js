import mongoose from "mongoose";

/**
 * Mongoose schema for temporary passenger data.
 * @typedef {Object} TemporyPassengerSchema
 * @property {string} packageType - The type of package purchased by the passenger.
 * @property {mongoose.Schema.Types.ObjectId} transactionId - The ID of the transaction associated with the passenger.
 * @property {Date} startTimeAndDate - The start time and date of the passenger's journey.
 * @property {Date} endTimeAndDate - The end time and date of the passenger's journey.
 * @property {Date} createdAt - The timestamp of when the passenger data was created.
 * @property {Date} updatedAt - The timestamp of when the passenger data was last updated.
 */
const TemporyPassengerSchema = new mongoose.Schema(
  {
    packageType: {
      type: String,
      required: true,
    },
    transactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    startTimeAndDate: {
      type: Date,
      required: true,
    },
    endTimeAndDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

//Creating a model
const TemporyPassenger = new mongoose.model(
  "TemporyPassenger",
  TemporyPassengerSchema
);

export default TemporyPassenger;
