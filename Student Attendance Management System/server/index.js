import express from 'express';
import Bodyparser  from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';

import route from './router/route.js'
import config from './config/config.js';
 import cookieParser from 'cookie-parser';



const app= express()
dotenv.config()

app.use(cors())
app.use(Bodyparser.json())
app.use(Bodyparser.text())
app.use(express.json())
app.use(Bodyparser.urlencoded({extended:true}))
app.use(cookieParser())

config();

app.use("/api/attendance",route)



app.listen(4000,()=>{
    console.log("server is running on 4000");
})
