import express from "express";
import Passenger from "../models/Passenger.js";
import Transaction from "../models/Transaction.js";
import authenticateToken from "../middlewares/auth.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/createPassenger", authenticateToken, async (req, res) => {
  const { email, name, nic, contactNo, address, accBalance, type } = req.body;

  const alreadyExistEmail = await Passenger.findOne({ email });
  if (alreadyExistEmail) {
    return res.status(400).json({ error: "Email already exist" });
  }
  const alreadyExistNic = await Passenger.findOne({ nic });
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
    const newPassenger = new Passenger({
      email: email,
      name: name,
      nic: nic,
      contactNo: contactNo,
      address: address,
      accBalance: accBalance,
      transactions: [savedTransaction._id],
    });

    const result = await newPassenger.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

// router.get(
//   "/getPassengers",
//   //  authenticateToken,
//   async (req, res) => {
//     try {
//       const result = await Passenger.find().limit(10);
//       return res.status(200).json({ result });
//     } catch (err) {
//       return res.status(400).json({ error: "Unknown Error Occured" });
//     }
//   }
// );

router.get(
  "/getPassengers/:pageSize/:pageNumber",
  authenticateToken,
  async (req, res) => {
    const { pageSize, pageNumber } = req.params;
    try {
      const result = await Passenger.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

router.post("/createPassengers", authenticateToken, async (req, res) => {
  const { passengers } = req.body;
  try {
    const result = await Passenger.insertMany(passengers);
    return res.status(201).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get(
  "/getPassenger/:id",
  //  authenticateToken,
  async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const result = await Passenger.find({ nic: id }).limit(1);
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

router.delete("/deletePassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Passenger.deleteOne({ _id: id });
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
    let user = await Passenger.findOne({ _id: id });
    if (!user) return res.status(400).json({ error: "user not found" });

    user = { ...user._doc, ...req.body };

    const result = await Passenger.updateOne({ _id: id }, user);

    return res.status(200).json({ result: user });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.put(
  "/addTransaction/:id",
  //  authenticateToken,
  async (req, res) => {
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
      let passenger = await Passenger.findOne({ _id: id });

      if (!passenger)
        return res.status(400).json({ error: "Passenger not found" });

      let transaction = await Transaction.create({
        amount: amount,
        type: type,
      });
      let savedTransaction = await transaction.save();

      passenger.transactions.push(savedTransaction._id);
      passenger.accBalance = Number(passenger.accBalance) + Number(amount);

      const result = await Passenger.updateOne({ _id: id }, passenger);

      return res.status(200).json({ result: result });
    } catch (err) {
      return res.status(400).json({ error: "Unknown Error Occured" });
    }
  }
);

export default router;
