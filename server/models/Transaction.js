import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      max: 50,
      required: [true, "name is required"],
    },
    type: {
      type: String,
      max: 50,
      required: [true, "type is required"],
    },
  },
  { timestamps: true }
);

//Creating a model
const Transaction = new mongoose.model("Transaction", transactionSchema);

export default Transaction;
