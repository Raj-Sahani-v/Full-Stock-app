import mongoose, { Schema, trusted } from "mongoose"

export const transactionSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    type : {
        type: String,
        enum : ['BUY', 'SELL', 'DEPOSIT' , 'WITHDRAW'],
        required : true,
    },
    symbol : {type : Number},
    qty : {type : Number},
    price : {type : Number},
    amount : {type : Number,
        require : true,

    },
    balanceAfter : {type : Number,required : true},
},{timestamps : true});