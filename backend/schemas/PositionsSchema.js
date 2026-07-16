import { Schema } from "mongoose";

export const PositionsSchema = new Schema({
    product : String,
    qty : Number,
    avg : Number,
    price : Number,
    net : String,
    day : String,
    isLoss : Boolean,
})