import { Product } from "../model/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from 'fs';

export const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    if (!name || !price || !description || !category || images.length === 0) {
        return res.status(400).json({
            status: false,
            error: 'All fields (name, price, description, category) and at least one image are required.'
        });
    }
    

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists' });
    }

    const newProduct = new Product({ name, price, description, category, images });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
});



export const getAllProducts=asyncHandler(async(req,res)=>{


    const products=await Product.find()
    if(!products){
        return res.status(404).json({message:"No products found"})
        }
        res.status(200).json({success: true, message: 'Products list fetched', data: products})
})

export const getProductsById=asyncHandler(async(req,res)=>{
    const { id } = req.params;


const product =await Product.findById(id)
if(!product){
    return res.status(404).json({success:false,message:"Product not found"})
    }

    res.status(200).json({success:true,message:"Product found",data:product})
})

export const updateProduct=asyncHandler(async(req,res)=>{
const {id}=req.params

 const updateProduct=await Product.findByIdAndUpdate(
    id,
    req.body,
    { new:true, runValidators:true}
)
if(!updateProduct){
    return res.status(404).json({success:false,message:"Product not found"})
    }
    res.status(200).json({success:true,message:"Product updated successfully",data:updateProduct})

})

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete associated images from uploads folder
    if (product.images && product.images.length > 0) {
        product.images.forEach(imagePath => {
            fs.unlink(imagePath, err => {
                if (err) console.error(`Failed to delete image: ${imagePath}`, err);
            });
        });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
});


