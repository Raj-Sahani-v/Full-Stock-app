import mongoose, { Schema } from "mongoose";

export const walletSchema = new Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true,
    },
    balance : {
        type : Number,
        default: 1000000,
        min : 0
    },

},
{
    timestamps : true
});