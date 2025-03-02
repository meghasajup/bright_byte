import mongoose from "mongoose";

const contactSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        subject:{type:String,required:true},
        message:{type:String,require:true}
        
    }
)

export const Contact=mongoose.model("Contact",contactSchema)