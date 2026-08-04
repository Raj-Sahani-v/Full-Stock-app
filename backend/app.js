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
import {Server} from 'socket.io'
import http from 'http'
import { intitSocket } from "./Server.js";

const app = express();
const server = http.createServer(app);

intitSocket(server);

app.use(cors({origin:["http://localhost:5173","http://localhost:5174","https://full-stock-app.onrender.com","https://full-stock-app.vercel.app","https://full-stock-app-nv8f.vercel.app"],
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

dotenv.config();


app.use("/api/v1/users", routing);

const port = process.env.PORT;

server.listen( port, ()=>{
    console.log(`Server is running ${port}`)
    mongoose.connect(process.env.MONGO_URL);
    console.log("database is connected")

});
    