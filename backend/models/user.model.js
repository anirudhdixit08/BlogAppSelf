import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email."],
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  education: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  token : {
    type : String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
