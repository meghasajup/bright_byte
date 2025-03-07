import express from "express"
import {  adminCategoryAdd, adminCreateProduct, adminDeleteProduct, adminGetAllProducts, adminGetAllProductsTotal, adminGetProductsById, adminUpdateProduct, checkAdmin, deleteCategory, getAllCategories, getProfile, login, logout, register, updateProductQuantity } from "../controllers/adminController.js"
import { verifyToken } from "../middleware/verifyAdminToken.js"
import { upload } from "../config/multer.js"

const router=express.Router()


router.post('/create',register)
router.post('/login',login)
router.get("/check-admin",verifyToken,checkAdmin)
router.post('/logout',verifyToken, logout);


router.post('/admincreateProduct',upload.array('images', 5),verifyToken,adminCreateProduct)
router.get('/getallProduct',verifyToken,adminGetAllProducts)
router.get('/getproductbyid/:id',verifyToken,adminGetProductsById)
router.get('/productcount',verifyToken,adminGetAllProductsTotal)
router.put('/updateProduct/:id',verifyToken,adminUpdateProduct)
router.delete('/deleteProduct/:id',verifyToken,adminDeleteProduct)
router.put('/updateProductQuantity/:id',updateProductQuantity)
router.get('/profile',verifyToken,getProfile)

router.post('/createcategory',upload.single('image'),verifyToken,adminCategoryAdd)
router.get('/getallCategory',verifyToken,getAllCategories)
router.delete('/deleteCategory/:id',verifyToken,deleteCategory)
export  default router
