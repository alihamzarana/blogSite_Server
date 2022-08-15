const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const body = {
      ...req.body
    };

    const checkEmail = await User.findOne({
      email: req?.body?.email
    });
    if (checkEmail) {
      res.json({
        status: "error",
        message: "E-mail already exists",
      });
    } else {
      const user = await new User(body);
      const data = await user.save();
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
    if (data.length) {
      res.json({
        status: "success",
        message: "All users fetched successfully",
        data,
      });
    }else{
       res.json({
         status: "error",
         message: "No users found",
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
    const data = await User.findById(req?.params?.id);
    if (data) {
      res.json({
        status: "success",
        message: "User fetch successfully",
        data,
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
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
    const user = await User.findOne({
      email: req?.body?.email
    });
    if (user) {
      const {
        password
      } = req.body;
      const checkPassowrd = await bcrypt.compare(password, user.password);
      if (checkPassowrd) {
        const payload = {
          _id: user._id,
        };
        const token = await jwt.sign({
            payload
          },
          "secret"
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
    } else {
      res.status(401).json({
        status: "error",
        message: "Invalid User",
      });
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
    const data = await User.findByIdAndDelete(req?.params?.id);
    if (data) {
      res.json({
        status: "success",
        message: "User deleted successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
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