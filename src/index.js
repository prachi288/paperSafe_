const express=require("express");
const {PORT}=require("./config/ServerConfig");
const {dbConnect}=require('./config/database');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Successfully started the server on PORT: ${PORT}`);
})
