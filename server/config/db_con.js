import mongoose from "mongoose";
import dotenv from "dotenv";

/**
 * Represents a singleton instance of a database connection.
 * @class
 */
class DatabaseSingleton {
  constructor() {
    return (async () => {
      if (!DatabaseSingleton.instance) {
        // Load environment variables
        dotenv.config();

        try {
          // Initialize the database connection
          await mongoose.connect(process.env.MONGODB_URL);
          console.log("Connection to the database established...");
          DatabaseSingleton.instance = this;
        } catch (err) {
          console.error("Error connecting to the database:", err);
        }
      }

      return DatabaseSingleton.instance;
    })();
  }
}

export default new DatabaseSingleton();
