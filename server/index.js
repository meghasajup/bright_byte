import express from "express";
import { connectDb } from "./config/db.js";
import logger  from "morgan";
import bodyParser from "body-parser";
import v1Router from "./routes/index.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app=express()
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDb()
app.use(cors({
    origin: process.env.ORIGIN, 
    credentials: true, 
    
  }));


app.use(bodyParser.json()); // Parse JSON bodies
app.use(logger('dev'));

app.use('/api/v1',v1Router)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT} `)
})