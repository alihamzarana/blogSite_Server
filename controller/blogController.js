const Blog = require("../model/blogModel");
let cloudinary = require("../imageUpload/cloudinary.config");

const addBlog = async (req, res) => {
  try {
    console.log("body request with userId", req.body.userId);
    console.log("body request", req.body);
    console.log("file request", req.file);
    let uploadImage = req.file?.path ? req.file.path : null;
    // ? await cloudinary.uploader.upload(req.file.path)
    // : null;
    console.log("upload image url", uploadImage);
    console.log("header request", req.headers);
    // return;
    // const image = uploadImage;
    const blogData = {
      title: req.body.title,
      body: req.body.body,
      image: uploadImage,
      author: req.body.author,
      userId: req.body.userId,
    };
    // console.log("data before store in db", blogdata);
    const data = await Blog.create(blogData);
    console.log("created blog", data);
    if (data) {
      res.json({
        status: "success",
        message: "Blog created",
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
    console.log("query request", req.query);
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
    console.log("start index", startIndex);
    console.log("end index", endIndex);

    console.log("result is", result);

    const blog = await Blog.find()
      .populate("userId", "username")
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();

    console.log("blogs count", count);

    if (blog) {
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
  // try {
  //   const data = await Blog.find();
  //   if (data.length) {
  //     res.json({
  //       status: "success",
  //       message: "All Blogs Fetched",
  //       data,
  //     });
  //   }
  // } catch (error) {
  //   res.json({
  //     status: "error",
  //     message: error.message,
  //   });
  // }
};

const updateBlog = async (req, res) => {
  try {
    console.log("body data for update", req.body);
    const blogId = req.params.id;
    let uploadImage = req.file?.path ? req.file.path : null;
    const updatedData = {
      title: req.body.title,
      body: req.bdy.body,
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
    console.log("updated data", data);
    if (data) {
      res.status(200).json({
        status: "success",
        message: "Blog updated Successfully",
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

const singleBlog = async (req, res) => {
  try {
    const data = await Blog.findById(req.params.id);
    if (data) {
      res.json({
        status: "success",
        message: "Single Blog Found",
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

const deleteBlog = async (req, res) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);
    if (data) {
      res.json({
        status: "success",
        message: "Blog Deleted successfully",
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
module.exports = {
  addBlog,
  deleteBlog,
  getAllBlogs,
  singleBlog,
  updateBlog,
};
