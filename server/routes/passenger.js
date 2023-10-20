import express from "express";
import Passenger from "../models/Passenger.js";
import PermenantPassenger from "../models/PermenantPassenger.js";
import TemporyPassenger from "../models/TemporyPassenger.js";
import Transaction from "../models/Transaction.js";
import authenticateToken from "../middlewares/auth.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/createPassenger", authenticateToken, async (req, res) => {
  const { email, name, nic, contactNo, address, accBalance, type } = req.body;

  const alreadyExistEmail = await PermenantPassenger.findOne({ email });
  if (alreadyExistEmail) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const alreadyExistNic = await PermenantPassenger.findOne({ nic });
  if (alreadyExistNic) {
    return res.status(400).json({ error: "NIC already exist" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!nic) {
    return res.status(400).json({ error: "NIC is required" });
  }
  if (!contactNo) {
    return res.status(400).json({ error: "Contact number is required" });
  }
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }
  if (!accBalance) {
    return res.status(400).json({ error: "Account balance is required" });
  }

  let savedTransaction = await Transaction.create({
    amount: accBalance,
    type: type,
  });

  try {
    /**
     * Creates a new PermenantPassenger object with the given parameters.
     * @param {string} email - The email of the passenger.
     * @param {string} name - The name of the passenger.
     * @param {string} nic - The NIC of the passenger.
     * @param {string} contactNo - The contact number of the passenger.
     * @param {string} address - The address of the passenger.
     * @param {number} accBalance - The account balance of the passenger.
     * @param {string[]} transactions - The list of transaction IDs associated with the passenger.
     * @param {string} passengerType - The type of the passenger (e.g. "Permanant").
     * @param {string} userId - The ID of the user associated with the passenger (if applicable).
     * @returns {PermenantPassenger} A new PermenantPassenger object.
     */

    const newPassenger = new PermenantPassenger({
      email: email,
      name: name,
      nic: nic,
      contactNo: contactNo,
      address: address,
      accBalance: accBalance,
      transactions: [savedTransaction._id],
      passengerType: "Permanant",
      userId: req.user.role === "user" ? req.user.id : null,
    });

    const result = await newPassenger.save();

    let passenger = await Passenger.create({
      passengerType: "Permenant",
      permentPassenger: result._doc._id,
    });
    let savedPassenger = await passenger.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get(
  "/getPassengers/:pageSize/:pageNumber",
  // authenticateToken,
  async (req, res) => {
    const { pageSize, pageNumber } = req.params;
    try {
      const result = await PermenantPassenger.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);
router.post(
  "/getPassengerParentId/:id",
  // authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    const { passengerType } = req.body;
    try {
      if (passengerType === "Permenant") {
        if (id === "undefined") {
          return res.status(200).json({ error: "No Id recieved" });
        }
        const result = await Passenger.findOne({ permentPassenger: id });
        return res.status(200).json(result._id);
      } else if (passengerType === "Tempory") {
        if (id === "undefined") {
          return res.status(200).json({ error: "No Id recieved" });
        }
        const result = await Passenger.findOne({ temporyPassenger: id });
        return res.status(200).json(result._id);
      }
    } catch (error) {}
  }
);

router.get("/getPassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PermenantPassenger.find({ nic: id }).limit(1);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get("/getPassengerByUserId", authenticateToken, async (req, res) => {
  const id = req.user.id;
  try {
    const result = await PermenantPassenger.findOne({ userId: id });

    if (!result) return res.status(400).json({ error: "User not found" });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.delete("/deletePassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PermenantPassenger.deleteOne({ _id: id });
    const result2 = await Passenger.deleteOne({ permentPassenger: id });
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.put("/updatePassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  if (req.body.nic === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "nic not recieved" });
  if (req.body.name === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "name not recieved" });
  if (req.body.email === "" || req.body.nic === undefined)
    return res
      .status(400 || req.body.nic === undefined)
      .json({ error: "email not recieved" });
  if (req.body.contactNo === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "contactNo not recieved" });
  if (req.body.address === "" || req.body.nic === undefined)
    return res.status(400).json({ error: "address not recieved" });

  try {
    let user = await PermenantPassenger.findOne({ _id: id });
    if (!user) return res.status(400).json({ error: "user not found" });

    user = { ...user._doc, ...req.body };

    const result = await PermenantPassenger.updateOne({ _id: id }, user);

    if (result.nModified === 0) {
      return res.status(400).json({ error: "Failed to update" });
    }

    return res.status(200).json({ result: user });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.put("/addTransaction/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { amount, type } = req.body;
  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  if (amount === "" || amount === undefined)
    return res.status(400).json({ error: "amount not recieved" });

  if (type === "" || type === undefined)
    return res.status(400).json({ error: "type not recieved" });

  try {
    let passenger = await PermenantPassenger.findOne({ _id: id });

    if (!passenger)
      return res.status(400).json({ error: "PermenantPassenger not found" });

    let transaction = await Transaction.create({
      amount: amount,
      type: type,
    });
    let savedTransaction = await transaction.save();

    passenger.transactions.push(savedTransaction._id);
    passenger.accBalance = Number(passenger.accBalance) + Number(amount);

    const result = await PermenantPassenger.updateOne({ _id: id }, passenger);
    if (result.nModified === 0) {
      return res.status(400).json({ error: "Failed to update" });
    }

    return res.status(200).json({
      result: {
        _id: passenger._id,
        accBalance: passenger.accBalance,
        transactions: passenger.transactions,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get("/getTransactionByUserId", authenticateToken, async (req, res) => {
  const id = req.user.id;
  try {
    const result = await PermenantPassenger.findOne({ userId: id });

    if (!result)
      return res.status(400).json({ error: "PermenantPassenger not found" });
    if (!result.transactions)
      return res.status(400).json({ error: "No transactions found" });
    let transactions = [];
    for (let i = 0; i < result.transactions.length; i++) {
      let transaction = await Transaction.findOne({
        _id: result.transactions[i],
      });
      transactions.push({
        _id: transaction._id,
        amount: transaction.amount,
        type: transaction.type,
        createdAt: transaction.createdAt,
      });
    }
    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});
router.post("/createTemporyPassenger", authenticateToken, async (req, res) => {
  try {
    const { amount, type, packageType } = req.body;
    if (!amount) return res.status(400).json({ error: "amount not recieved" });
    if (!type) return res.status(400).json({ error: "type not recieved" });
    if (!packageType)
      return res.status(400).json({ error: "packageType not recieved" });

    let savedTransaction = await Transaction.create({
      amount: amount,
      type: type,
    });

    const currentDate = new Date();
    let endDateTime = new Date();

    if (packageType === "One Day") {
      endDateTime.setDate(endDateTime.getDate() + 1);
    } else if (packageType === "Week") {
      endDateTime.setDate(endDateTime.getDate() + 7);
    }

    Date.now();

    const newPassenger = new TemporyPassenger({
      packageType: packageType,
      transactions: [savedTransaction._id],
      startTimeAndDate: currentDate,
      endTimeAndDate: endDateTime,
    });

    const result = await newPassenger.save();

    let passenger = await Passenger.create({
      passengerType: "Tempory",
      temporyPassenger: result._doc._id,
    });
    let savedPassenger = await passenger.save();

    return res.status(201).json(result._doc);
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

export default router;
