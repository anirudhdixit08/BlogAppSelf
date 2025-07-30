import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  catogery: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength : [50,"Should be atleat 50 characters"]
  },
  adminName:{
    type : String,
    // required : true
  },
  adminPhoto : {
    type : String,
    // required : true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref : "User"
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
