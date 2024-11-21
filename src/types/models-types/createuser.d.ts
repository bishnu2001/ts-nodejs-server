import { ObjectId } from "mongoose";
export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
}