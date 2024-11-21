// import { Conflict, NotFound } from "http-errors";
import jwt from "jsonwebtoken";
import {User,Signin} from "../types/business-logic-types";
import users from "../model/users/users.model";
import {encryptData} from "../helper/secure/encrypt.data";
import {decryptData,decryptObject} from "../helper/secure/decrypt.data";
import {hashPassword} from "../helper/secure/passwaro.data";
import bcrypt from "bcrypt";
import { configs } from "../configs";
import { Document } from 'mongoose';
import { client } from "../redis/redisclient";
import zlib from "zlib";
const compressData = (data:any) => zlib.gzipSync(JSON.stringify(data)).toString('base64');
const decompressData = (data:any) => JSON.parse(zlib.gunzipSync(Buffer.from(data, 'base64')).toString());
export const CreateUser=async({username,email,password}:User)=>{
    try {
        const encryptedEmail = encryptData(email);
        const encryptedUsername = encryptData(username);
        const hashedPassword = await hashPassword(password);
        const user=await users.create({
            username:encryptedUsername,
            email:encryptedEmail,
            password:hashedPassword
        })
        return user;
    } catch (error) {
        throw error
    }
}
export const SignIn=async({email,password}:Signin)=>{
    try {
        const encryptedEmail = encryptData(email);
        const user=await users.findOne({email:encryptedEmail});
        if(!user){
            throw new Error("User Not Found")
        }
        const decryptedUser = decryptObject((user as Document<any>).toObject());
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            throw new Error("Invalid credentials")
        }
        const token=jwt.sign({ id: user._id },configs.JWT_SECRET || "",{expiresIn:"1h"});
        return token;
    } catch (error) {
        throw error
    }
}
export const GetAllUser=async()=>{
    try {
        const cacheKey = "allUsers";
        // Check if data is cached in Redis
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
          console.log("Returning cached data for all users");
        //   return JSON.parse(cachedData);
        return decompressData(cachedData);
        }
        const result=await users.aggregate([
            {
               $lookup: {
                from:"users",
                localField:"userid",
                foreignField:"_id",
                as:"userinfo"
               }
            },
            {
                $unwind:{
                    path:"$userinfo",
                    preserveNullAndEmptyArrays:true
                }
            },
            {
                $project:{
                    _id:1,
                    username:1,
                    email:1,
                    createdAt:1,
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $limit:100
            }
        ])
        // await client.set(cacheKey, JSON.stringify(result), {
        //     EX: 3600, // 1 hour expiration
        //   });
        await client.set(cacheKey, compressData(result), { EX: 3600 });
          console.log("Data cached in Redis for all users");
        return result;
    } catch (error) {
        throw error
    }
}