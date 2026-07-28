import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { generateJwtToken } from "../utils/generateToken.js";
import blackListModel from "../models/blacklist.model.js";

/**
 * @name registerUser
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userExist) {
      return res.json({
        message: "Account already exists with this username or email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const RegisterToken = generateJwtToken(newUser);
    console.log("Token:", RegisterToken);
    res.cookie("token", RegisterToken);
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
  } catch (err) {
    console.log("Error while Creating the user", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password or email" });
    }
    const loginToken = generateJwtToken(user._id);
    console.log("LoginToken:", loginToken);
    res.cookie("token", loginToken);
    res.status(200).json({
      message: "User logged in successfully",user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("Error while logging in the user", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
  
};

export const logoutUser = async (req, res) => {
  try{
    const token = req.cookies.token;
    if(token){
      const blackListToken = new blackListModel({ token });
      await blackListToken.save();
      res.clearCookie("token");
      res.status(200).json({ message: "User logged out successfully" });
    }
  }catch(err){
    console.error("Error while logging out the user", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

