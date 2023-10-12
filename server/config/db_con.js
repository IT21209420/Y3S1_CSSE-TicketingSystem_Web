import mongoose from "mongoose";

export const connect = async () => {
  return (
    mongoose
      .connect(
        "mongodb+srv://ticketingSystem:6MBmj6PIX0TOrOPg@cluster0.ry81vz0.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => console.log(`Database has been connected...`))
      //error occurs while connecting to the database,catch it here.
      .catch((err) => console.log(err))
  );
};
