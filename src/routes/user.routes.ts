import { Router } from "express";
import {User} from "../validation/users";
import limiter from "../middleware/limiter.middleware";

// import { Request } from "express";
import {UserController} from "../controller/user.controller";
import { authenticateToken } from "../middleware/authentication.middleware";
const router=Router();

router.post('/signup',User.create,UserController.CreateUser);
router.post('/signin',User.signin,limiter,UserController.SignIn);
router.get("/getalluser",authenticateToken,UserController.GetAllUser);
export default router;