import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  cors from 'cors';
import {positionModel} from "./model/Positionmodel.js"
import {OrderModel} from "./model/OrdersModel.js"
import {HoldingsModel} from "./model/HoldingsModel.js"
import { UserModel } from "./model/UserModel.js";
import { routing } from "./route/userRoute.js";
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({origin:["https://full-stock-app.vercel.app","https://stock-market-woad-one.vercel.app"],
  credentials:true
}))
app.use(cookieParser())
app.use(express.json())
dotenv.config();


app.use("/api/v1/users", routing);
const positions = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];

const port = process.env.PORT;

app.listen( port, ()=>{
    console.log(`Server is running ${port}`)
    mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected")

})