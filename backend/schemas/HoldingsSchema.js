import mongoose, { Schema } from "mongoose";
 export const HoldingsSchema = new Schema({
  userId : {type : mongoose.Schema.Types.ObjectId,
    ref : 'user',
    required : true,
  },
  name: {
    type:String
  },
  qty: {type : Number,
    min: 0
  },
  avg : {type : Number},
  price: {type : Number},
});
