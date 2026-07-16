import { model } from "mongoose";
import { UserSchema } from "../schemas/UserSchema.js";

export const UserModel = new model('users',UserSchema) 