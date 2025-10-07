import express from "express";
import {createUserAccount,authenticateUser,logoutUser} from '../controllers/user.controller.js';
import { validateSignup, validateSignin } from "../middlewares/validation.middleware.js";

const router = express.Router();

//post request to create a new user
router.post("/signup", validateSignup, createUserAccount);
router.post("/login",validateSignin,authenticateUser);
router.post("/logout",logoutUser);


export default router;