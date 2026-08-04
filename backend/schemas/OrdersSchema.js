import mongoose, { Schema } from "mongoose";

export const OrdersSchema = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    name:{type : String ,required : true},
    qty:{type : Number, min : 1 , required : true},
    price: {type : Number, required : true},
    mode: {type : Number , required : true } ,
    order_type : { type : Number , required : true },
}
,{timestamps:true})