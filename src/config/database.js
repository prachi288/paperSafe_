const mongoose=require('mongoose');
const {MONGODB_URL}=require("./ServerConfig");

const dbConnect=async()=>{
    try{
      await mongoose.connect(MONGODB_URL);
      console.log("Database Connected.....")  
    } catch (error) {
       console.log("Error in Connecting DB......");
       console.log(error);
       throw error;
    }
}

module.exports={
    dbConnect
}