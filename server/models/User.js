import mongoose from "mongoose";

/**
 * User schema for MongoDB
 * @typedef {Object} UserSchema
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {string} role - User's role (default: "user")
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    required: [true, "email is required"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    default: "user",
    required: [true, "role is required"],
  },
});

//Creating a model
const User = new mongoose.model("User", UserSchema);

export default User;
