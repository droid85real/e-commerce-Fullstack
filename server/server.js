// server.js
import express from "express";
import { PORT } from "./src/config/env.js";
import productRoutes from "./src/modules/products/product.routes.js";

//create server
const server=express();

// server.use("/",(req,res)=>{
//     res.status(200).send("Backend is working");
// });

// parses JSON bodies
server.use(express.json());

// parse form data
server.use(express.urlencoded({extended:true}));

// all products req are redirected to product.routes.js
server.use(
    "/api/products",
    productRoutes
);


server.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
});