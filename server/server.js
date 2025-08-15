import express from "express";

const server=express();

server.use("/",(req,res)=>{
    res.status(200).send("Backend is working");
});

server.listen(3000,()=>{
    console.log("server is listening at 3000")
});