import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";
import { connectToSocket } from "./controllers/socketManager.js";

dns.setDefaultResultOrder("ipv4first");

const app=express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port" ,(process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit: "40kb "}));
app.use(express.urlencoded({limit : "40kb", extended: true}));
app.get("/",(req,res)=>{
    res.send("this is new root");
})


const start =async ()=>{
    await mongoose.connect(
  "mongodb://127.0.0.1:27017/manthanmeet"
);

console.log("MongoDB Connected");
server.listen(app.get("port"),()=>{
    console.log("listing on port 8000");
});
}
start();
