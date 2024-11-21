import { Request } from "express";
// import { ROLE } from "./user";

export interface MIDDLEWARE_REQUEST_TYPE extends Request {
  user?:any;
}
