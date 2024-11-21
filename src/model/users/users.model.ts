import { Schema,model } from "mongoose";
import {User} from "../../types/models-types"

const UserSchema=new Schema<User>(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password: {
            type: String,
            required: true,
          },
    },
    {
        timestamps:true
    }
);

const User=model<User>("User", UserSchema);
export default User;