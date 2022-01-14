const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const body = { ...req.body };
    console.log("body request", body);

    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      res.json({
        status: "error",
        message: "E-mail already exists",
      });
    } else {
      console.log("checkemail", checkEmail);
      const user = await new User(body);
      console.log("new user:", user);
      const data = await user.save();
      console.log("user created data", data);
      if (data) {
        res.json({
          status: "success",
          message: "User Created Successfully",
          data: data,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    if (data) {
      res.json({
        status: "success",
        message: "All users fetched successfully",
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

const getSingleUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (data) {
      res.json({
        status: "success",
        message: "User fetch successfully",
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

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const { password } = req.body;
      const checkPassowrd = await bcrypt.compare(password, user.password);
      if (checkPassowrd) {
        const payload = {
          _id: user._id,
        };
        const token = await jwt.sign(
          { payload },
          "blogsite"
          // , {
          //   expiresIn: "1h",
          // }
        );
        if (token) {
          res.json({
            status: "success",
            message: "Login Successful",
            token: token,
            data: user,
          });
        }
      } else {
        res.status(401).json({
          status: "error",
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if (data) {
      res.json({
        status: "success",
        message: "User deleted successfully",
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
  createUser,
  getAllUsers,
  getSingleUser,
  userLogin,
  deleteUser,
};
