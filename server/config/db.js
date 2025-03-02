import mongoose from "mongoose";


 export const connectDb=()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    })
    
}


