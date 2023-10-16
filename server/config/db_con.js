import mongoose from "mongoose";
import dotenv from "dotenv";

/**
 * Represents a singleton instance of a database connection.
 * @class
 */
class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      dotenv.config();
      // Initialize the database connection
      mongoose
        .connect(process.env.MONGODB_URL)

        .then(() => console.log(`connetion to database established...`))

        .catch((err) => console.log(err));

      DatabaseSingleton.instance = this;
    }

    return DatabaseSingleton.instance;
  }
}

export default new DatabaseSingleton();
