import mongoose from "mongoose";

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
