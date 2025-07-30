import mongoose from "mongoose";
import {Blog} from "../models/blog.model.js"
import cloudinary from "cloudinary";


export const createBlog = async (req, res) => {
  try {

    if (!req.files || Object.keys(req.files).length == 0) {
      return res.status(400).json({ message: "Blog image is required.!" });
    }

    const { blogImage } = req.files;
    const allowedFormats = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only jpg and png are allowed!!" });
    }

    const {title,catogery,about } = req.body;

    if (!title || !catogery || !about) {
      return res
        .status(400)
        .json({ message: "Title,Catogery and About are required fields!" });
    }


    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );

    // const photoTempPath = photo.tempFilePath;
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(error);
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo;
    const createdBy = req?.user?._id;

    const blogData = new Blog({
      title,
      about,
      catogery,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });

    const blog = await Blog.create(blogData);
    res.status(201).json({message : "Blog Created Succefully!", blog})
  } catch (error) {
    console.error("Error during Blog Creation:", error);
    res.status(500).json({
      message: "Server error during Blog Creation.",
      error: error.message,
    });
  }
};




export const deleteBlog = async (req, res) => { 
  try {
    const { id } = req.params; 

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found or already deleted" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });

  } catch (error) {
    console.error("Error during blog deletion:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid blog ID format" });
    }
    return res.status(500).json({ error: "Internal Server error" });
  }
}

export const getAllBlogs = async (req,res) => {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
}

export const getSingleBlog = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: "Invalid blog ID format" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ error: "Blog not found or already deleted" });
    }
    res.status(200).json(blog);
}

export const getMyBlogs = async (req,res) => {
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({createdBy});
    res.status(200).json(myBlogs);
}

export const updateBlog = async (req,res)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: "Invalid blog ID format" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{new : true});
    if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found.!" });
    }
    res.status(200).json(updatedBlog);
}