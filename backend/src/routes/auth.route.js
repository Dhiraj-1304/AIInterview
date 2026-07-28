import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/user.controller.js";
import authUser from "../middleware/auth.middleware.js";

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
authRouter.post("/login",loginUser);

/**
 * @route POST /api/auth/logout
 * @description clear the cookie so that the user can logout and blacklist the token in the backend so that the user cannot access the protected routes
 * @access Public
 */
authRouter.post("/logout", logoutUser);

/**
 * @route POST /api/auth/getMe
 */

authRouter.post("/get-Me",authUser,getMe)
 

export default authRouter;