const Blog = require("../model/blogModel");

const addBlog = async (req, res) => {
  try {
    let uploadImage = req.file?.path ? req.file.path : null;
    const blogData = {
      title: req.body.title,
      body: req.body.body,
      image: uploadImage,
      author: req.body.author,
      userId: req.body.userId,
    };
    const data = await Blog.create(blogData);
    if (data) {
      res.json({
        status: "success",
        message: "Blog created",
        data,
      });
    }else{
       res.json({
         status: "error",
         message: "No blog created",
         data,
       });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = await Blog.countDocuments();

    const result = {};
    if (endIndex < count) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const blog = await Blog.find()
      .populate("userId", "username")
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();


    if (blog.length) {
      res.json({
        status: "success",
        message: "Blogs successfully found!",
        data: blog,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      });
    } else {
      res.json({
        status: "error",
        message: "Blogs not found!",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params?.id;
    let uploadImage = req.file?.path ? req.file.path : null;
    const updatedData = {
      title: req.body.title,
      body: req.body.body,
      image: uploadImage,
    };
    if (updatedData.uploadImage === null) {
      delete updatedData.uploadImage;
    }

    const data = await Blog.findByIdAndUpdate(
      { _id: blogId },
      { ...updatedData },
      { new: true }
    );
    console.log("data", data)
    if (data) {
      res.status(200).json({
        status: "success",
        message: "Blog updated Successfully",
        data,
      });
    }else{
      res.json({
        status: "error",
        message: "No blog updated",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const singleBlog = async (req, res) => {
  try {
    const data = await Blog.findById(req?.params?.id);
    if (data) {
      res.json({
        status: "success",
        message: "Single Blog Found",
        data,
      });
    }else{
      res.json({
        status: "error",
        message: "No blog found",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req?.params?.id);
    if (data) {
      res.json({
        status: "success",
        message: "Blog Deleted successfully",
      });
    }else{
      res.json({
        status: "error",
        message:'No data found'
      })
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = {
  addBlog,
  deleteBlog,
  getAllBlogs,
  singleBlog,
  updateBlog,
};
