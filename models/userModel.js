import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      address: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // will show when the new user was created.
);

export default mongoose.model("users", userSchema);
