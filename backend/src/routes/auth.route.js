import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authRouter.post("/login", loginUser);
 

export default authRouter;