import {User} from '../models/user.model.js';
import {generateToken} from '../utils/token.js';
import asyncHandler from 'express-async-handler';
import { catchAsync } from "../middleware/error.middleware.js";
import { AppError } from "../middleware/error.middleware.js";
import crypto from "crypto";

//create a new user
export const createUserAccount= catchAsync(async(req,res)=>{
    //fetch the details from the request body
    const {firstname,lastname,username,email,password}= req.body;

    //check if the user already exists
    const existingUser= await User.findOne({ email: email.toLowerCase() });
    if(existingUser){
        throw new AppError("User already exists with this email",400);
    }
    //create a new user
    const user = await User.create({
        firstname,
        lastname,
        username,
        email: email.toLowerCase(),
        password
    })

    //call the generateToken function from utils to generate the token and send the token and respons(user data) back to the user
    generateToken(res,user._id,"User created successfully");

})