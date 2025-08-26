
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import TryCatch from "../utils/TryCatch.js";
import type { AuthenticatedRequest } from "../middleware/isAuth.js";
import getBuffer from "../utils/dataUri.js";
import {v2 as cloudinary} from "cloudinary";
import { oauth2client } from "../utils/GoogleConfig.js";
import axios from "axios";

dotenv.config();


export const login = TryCatch(async(req,res)=>{
    const {code} = req.body
    
    if(!code){
        res.status(400).json({
            message: "Authorization code is required",
        });
        return;
    }

    const googleRes = await oauth2client.getToken(code)
    oauth2client.setCredentials(googleRes.tokens)

    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

    const {email, name, picture} = userRes.data;

    let user = await User.findOne({email});

    if(!user){
        user = await User.create({
            email:email,
            name: name,
            image: picture,
        });
    }


    const token = jwt.sign({user},process.env.JWT_SECRET as string, {
        expiresIn:"5d"
    })

    res.status(200).json({
        message:"Login Success",
        token,
        user
    })
})

export const getMyProfile = TryCatch(async(req:AuthenticatedRequest,res)=>{
    const user = req.user

    res.json(user);
})


export const getUserProfile = TryCatch(async(req,res)=>{
    const userId = req.params.id;

    const user = await User.findById(userId);

    if(!user){
        return res.status(404).json({
            message:"No user with this ID",
        })
    }

    res.json(user);
})

export const updateUser = TryCatch(async (req: AuthenticatedRequest, res) => {
    const { name, instagram, facebook, linkedin, bio } = req.body;
  
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        name,
        instagram,
        facebook,
        linkedin,
        bio,
      },
      { new: true }
    );
  
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "5d",
    });
  
    res.json({
      message: "User Updated",
      token,
      user,
    });
});

export const updateProfilePic = TryCatch(async (req: AuthenticatedRequest, res) => {
    const file = req.file;

    if (!file) {
    res.status(400).json({
        message: "No file to upload",
    });
    return;
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
    res.status(400).json({
        message: "Failed to generate buffer",
    });
    return;
    }
    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: process.env.CLOUDINARY_FOLDER_NAME as string,
    });

    const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
        image: cloud.secure_url,
    },
    { new: true }
    );

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "5d",
    });

    res.json({
    message: "User Profile pic updated",
    token,
    user,
    });

});