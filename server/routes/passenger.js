import express from "express";
import Passenger from "../models/Passenger.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/createPassenger", authenticateToken, async (req, res) => {
  const { email, name, nic, contactNo, address,accBalance } = req.body;

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
  try {
    const newPassenger = new Passenger({
      email: email,
      name: name,
      nic: nic,
      contactNo: contactNo,
      address: address,
      accBalance: accBalance,
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

router.post("/createPassengers", 
// authenticateToken,
 async (req, res) => {
  const { passengers } = req.body;
  try {
    const result = await Passenger.insertMany(passengers);
    return res.status(201).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

router.get("/getPassenger/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await Passenger.find({ nic: id }).limit(1);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ error: "Unknown Error Occured" });
  }
});

export default router;
