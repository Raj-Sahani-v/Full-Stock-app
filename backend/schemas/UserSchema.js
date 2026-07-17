import { Schema } from "mongoose";

export const UserSchema = new Schema({
    phone :{type:Number , unique: true,required: true},
    password : {type: String},
    token : {type : String},
    term : {type:Boolean,required: true}
})