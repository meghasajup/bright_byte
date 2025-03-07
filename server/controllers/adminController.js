import { Admin } from "../model/adminSchema.js";
import { Product } from "../model/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { Category } from "../model/categorySchema.js";
import { cloudinaryInstance } from "../config/Cloudinary.js";


export const register=asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await Admin.create({ username, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });

  export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.cookie('Admintoken', token, { // httpOnly: true,  sameSite: 'None',
      secure: true, secure: process.env.NODE_ENV === 'production' });
  
    res.status(200).json({ success: true, message: 'Admin logged in successfully', token });
  });

  export const adminCreateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category, stock, stockNum } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];

    if (!name || !price || !description || !category || images.length === 0) {
        return res.status(400).json({
            status: false,
            error: 'All fields (name, price, description, category) and at least one image are required.'
        });
    }

    const uploadResults = await Promise.all(
        images.map(image => cloudinaryInstance.uploader.upload(image, { folder: "products" }))
    );

    const imageUrls = uploadResults.map(result => result.url);

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
        return res.status(400).json({ message: 'Product already exists' });
    }

    const newProduct = new Product({ 
        name, 
        price, 
        description, 
        category, 
        stock, 
        stockNum, 
        images: imageUrls 
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
});


  export const getProfile = asyncHandler(async (req, res) => {

    const user = await Admin.findById(req.user.id).select('-password');
  console.log(req.user);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

  
  export const adminGetAllProducts=asyncHandler(async(req,res)=>{
  
  
      const products=await Product.find()
      if(!products){
          return res.status(404).json({message:"No products found"})
          }
          res.status(200).json({success: true, message: 'Products list fetched', data: products})
  })
  
  export const adminGetProductsById=asyncHandler(async(req,res)=>{
      const { id } = req.params;
  
  
  const product =await Product.findById(id)
  if(!product){
      return res.status(404).json({success:false,message:"Product not found"})
      }
  
      res.status(200).json({success:true,message:"Product found",data:product})
  })


  export const adminGetAllProductsTotal=asyncHandler(async(req,res)=>{
  
  
    const products=await Product.countDocuments()
    if(!products){
        return res.status(404).json({message:"No products found"})
        }
        res.status(200).json({success: true, message: 'Products list fetched', data: products})
})

  
  
  export const adminUpdateProduct=asyncHandler(async(req,res)=>{
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


export const updateProductQuantity= asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    console.log("dfdfdfdf",req.body);
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    product.stockNum -= quantity; // Assuming you have a `stock` field
    await product.save();
  
    res.json({ message: 'Stock updated successfully' });
  })
  
  
  export const adminDeleteProduct = asyncHandler(async (req, res) => {
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
  
  


  
  export const checkAdmin=asyncHandler(async(req,res,next)=>{
  

    const admin=req.user;
    
    if(!admin){
        return res.status(401).json({success:false,message:'admin not authenticated'})
        }
    
  res.json({success:true,message:'admin is authenticated'})


} )



export const adminCategoryAdd = asyncHandler(async (req, res) => {
  try {
      const { name, description } = req.body;
      const image = req.file; // Single upload with Multer

      if (!image) {
          return res.status(400).json({ success: false, message: "Image is required" });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
          return res.status(400).json({ success: false, message: "Category already exists" });
      }

      const uploadResult = await cloudinaryInstance.uploader.upload(image.path, { folder: "category" });

      const newCategory = new Category({
          name,
          description,
          image: uploadResult.secure_url // Use Cloudinary URL
      });

      await newCategory.save();
      res.status(201).json({ success: true, message: "Category created successfully" });
  } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});


export const getAllCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
  }

  await category.deleteOne();

  res.status(200).json({ success: true, message: 'Category deleted successfully' });
});



export const logout = asyncHandler(async (req, res) => {
    try {
      res.cookie('Admintoken', '', { httpOnly: true, expires: new Date(0) });
      res.status(200).json({ success: true, message: 'Admin logged out successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to log out' });
    }
  });