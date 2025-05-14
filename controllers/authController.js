import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is reqd" });
    }
    if (!email) {
      return res.send({ message: "email is reqd" });
    }
    if (!password) {
      return res.send({ message: "password is reqd" });
    }
    if (!phone) {
      return res.send({ message: "phone is reqd" });
    }
    if (!address) {
      return res.send({ message: "address is reqd" });
    }
    if (!answer) {
      return res.send({ message: "address is reqd" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already registered please login ",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Registration",
      error,
    });
  }
};

//LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found please sign up first",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successful",
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        answer: user.answer,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in signup",
      error,
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected route");
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "new password is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong email or answer", error });
    }

    const newHashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, {
      password: newHashedPassword,
    });
    res.status(200).send({ success: true, message: "updated" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//update user profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    //password

    if (password && password.length < 6) {
      return res.json({ error: "password must be atleast 6 characters long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "User Details Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong in updating profile",
      error,
    });
  }
};

//get orders for user controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "something went wrong while getting the orders",
      error,
    });
  }
};

//get all orders for admin controller
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });

    //console.log(hello);
    res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong while getting the orders",
      error,
    });
  }
};

//order status update controller
export const orderStatusController = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      oid,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong while updating the status of the order",
      error,
    });
  }
};
