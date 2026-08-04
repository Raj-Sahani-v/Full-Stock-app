import { Server } from "socket.io";
import { LiveChart, LiveData, MarketData } from "./controller/controller.js";

export const intitSocket=(server)=>{
    const io = new Server (server, {
        cors : {
            origin:"http://localhost:5174",
            credentials:true
        }
    });

    io.on('connection', (socket)=>{
        console.log(socket.id);
    });
    LiveData(io)
    MarketData(io)
    LiveChart(io);
}