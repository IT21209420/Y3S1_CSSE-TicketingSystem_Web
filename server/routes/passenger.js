import express from "express";
import Passenger from "../models/Passenger.js";
import authenticateToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/createPassenger", authenticateToken, async (req, res) => {
  
  const { content } = req.body;
  try {
    const newPassenger = new Passenger({
      email: content.email,
      name: content.name,
      nic: content.nic,
      contactNo: content.contactNo,
      address: content.address,
    });
    const result = await newPassenger.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});
