import { RequestHandler } from "express";
import {CreateUser,SignIn,GetAllUser} from "../business-logic/users.business";
import {NotFound} from "http-errors"

export const UserController:{
CreateUser:RequestHandler,
SignIn:RequestHandler,
GetAllUser:RequestHandler
}={
    async CreateUser(req,res,next){
       try {
        const{username,email,password}=req.body;
        const users=await CreateUser({username,email,password})
        if (!users) throw new NotFound("Something went wrong");
        res.json({
          success: true,
          message: "Signup successfull",
          date: users,
        });
       } catch (error) {
        next(error)
       }
    },
    async SignIn(req,res,next){
      try {
        const {email,password}=req.body;
        const user=await SignIn({email,password});
        if (!user) throw new NotFound("Something went wrong");
        res.json({
          success:true,
          message:"signin successfull",
          data:user
        })
      } catch (error) {
        next(error)
      }
    },
    async GetAllUser(req,res,next){
      try {
       const users=await GetAllUser();
      if(!users) throw new Error("unable fetch user");
      res.json({
        success:true,
        message:"fetch successfull",
        data:users
      })
      } catch (error) {
        next(error)
      }
    }
}