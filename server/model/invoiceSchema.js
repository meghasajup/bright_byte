import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
    date: {type:String,required:true},
    name: {type:String,required:true},
    address: {type:String,required:true},
    items: Array,
    totalInWords: {type:String,required:true},
    taxableAmount: {type:Number,required:true},
    cgst: {type:Number},
    sgst: {type:Number},
    igst: {type:Number},
    gstin:{
      type:String
    },
    grandTotal: {type:Number,required:true}
  });
  

  export const Invoice=mongoose.model("Invoice",invoiceSchema)