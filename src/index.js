const express=require("express");
const bodyParser=require('body-parser')
const {PORT}=require("./config/ServerConfig");
const apiRoutes=require('./routes/index')

const {dbConnect}=require('./config/database');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api',apiRoutes)

app.listen(PORT,()=>{
    dbConnect();
    console.log(`Successfully started the server on PORT: ${PORT}`);
})
