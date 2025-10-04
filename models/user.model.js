import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    firstname:{
        
        type: String,
        required: [true,"First name is required"],
        trim: true,
        minLength:3,
        maxLength:[50,"First name must be less than 50 characters"]

    },
    lastname:{
      
        type:String,
        required: [true,"Last name is required"],
        trim:true,
        minLength:3,
        maxLength:[50,"Last name must be less than 50 characters"]

    },
    username:{
        type: String,
        required: [true,"Username is required"],
        trim: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:3,
        maxLength:[20,"Username must be less than 20 characters"]
    },
     email:{
        type:String,
        required: [true,"Email is required"],
        trim: true,
        unique: true,
        lowercase:true,
         match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        minLength:[6,"Password must be at least 6 characters"],
        select:false //to not return the password when querying the user
    },
    bio:{
        type: String,
        maxLength: [200,"Bio must be less than 200 characters"],
        default: ""
    }
   
},{timestamps:true});

export const userModel= mongoose.model("User",userSchema)

