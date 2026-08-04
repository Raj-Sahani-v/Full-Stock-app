import mongoose, { Schema } from "mongoose";

export const watchList = new Schema({
    userId : {type:mongoose.Schema.ObjectId,
        ref : 'user',
        required: true
    },
    symbol : {
        type : [String],
        required :true,
        
    },
    exchange : {type:String,
            default : 'NSE',
        },
    addedAt : {
        type : Date,
        default: Date.now
    },

})