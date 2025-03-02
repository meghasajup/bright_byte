import express from "express"
import upload from "../config/multer.js"
import { adminCreateProduct, adminDeleteProduct, adminGetAllProducts, adminGetProductsById, adminUpdateProduct, checkAdmin, login, logout, register } from "../controllers/adminController.js"
import { verifyToken } from "../middleware/verifyAdminToken.js"

const router=express.Router()


router.post('/create',register)
router.post('/login',login)
router.get("/check-admin",verifyToken,checkAdmin)
router.post('/logout',verifyToken, logout);


router.post('/admincreateProduct',upload.array('images', 5),verifyToken,adminCreateProduct)
router.get('/getallProduct',verifyToken,adminGetAllProducts)
router.get('/getproductbyid/:id',verifyToken,adminGetProductsById)
router.put('/updateProduct/:id',verifyToken,adminUpdateProduct)
router.delete('/deleteProduct/:id',verifyToken,adminDeleteProduct)

export  default router
