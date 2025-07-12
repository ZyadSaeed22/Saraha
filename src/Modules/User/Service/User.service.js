import jwt from "jsonwebtoken";
import { User } from "../../../database/model/user.model.js";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = jwt.verify(authorization, "jwt_secret_key");

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "not found",
        user,
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 }).limit(5);
    if (users.length == 0) {
      return res.status(404).json({ message: "user not found" });
    }
    const allusers = await User.countDocuments();
    res.status(200).json({
      status: "success",
      message: "fetched successfully",
      users,
      allusers,
    });
  } catch (err) {
    res.status(200).json({
      message: "internal server err",
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = jwt.verify(authorization, "jwt_secret_key");
    const user = await User.findById(id).select("-password -_v");
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "not found",
        user,
      });
    }
    res.status(200).json({
      status: "success",
      message: "fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = jwt.verify(authorization, "jwt_secret_key");

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "user deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({
      status: "success",
      message: "all users deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: error.message,
      stack: error.stack,
    });
  }
}