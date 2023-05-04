import mongoose from "mongoose";

const config=async()=>{
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/attendance')
    console.log("Database successfully connected");
     } catch (error){
         console.log(error);
     }
}

export default config;