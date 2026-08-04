import mongoose, { Schema } from "mongoose";

export const PositionsSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    product : String,
    qty : Number,
    avg : Number,
    price : Number,
})