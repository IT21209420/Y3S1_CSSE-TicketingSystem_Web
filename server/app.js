import express from "express";
import morgan from "morgan";
import  "./config/db_con.js";
import authRouter from "./routes/auth.js";

import passengerRouter from "./routes/passenger.js";
import dotenv from "dotenv";

dotenv.config();

import cors from "cors";

const app = express();

//middlewares
app.use(express.json()); //Send respones in json fomrat
app.use(morgan("tiny")); //log requests
app.use(cors());
//routes

app.use("/api", authRouter);

app.use("/api", passengerRouter);

//server config
/**
 * The port number on which the server will listen for incoming requests.
 * @type {number}
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
