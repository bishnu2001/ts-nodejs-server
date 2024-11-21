import jwt from "jsonwebtoken";
import { configs } from "../configs";
import { Response,NextFunction } from "express";
import { MIDDLEWARE_REQUEST_TYPE } from "../types/middleware/global";
export const authenticateToken = (
    req: MIDDLEWARE_REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ):void => {
    const token = req.header("Authorization")?.split(" ")[1]; // Assuming the token is provided in the Authorization header as "Bearer token"
  
    if (!token) {
        res.status(401).json({ message: "Access token missing or invalid" });
        return; // Explicitly return to ensure no further code executes
    }
  
    jwt.verify(token, configs.JWT_SECRET || " ", (err, user: any) => {
      if (err) {
        return res.sendStatus(403); // Token verification failed
      }
      req.user = user;
      next();
    });
  };