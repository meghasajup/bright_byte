import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductsById, updateProduct } from "../controllers/productController.js"
import { updateProductQuantity } from "../controllers/adminController.js"
import { upload } from "../config/multer.js"

const router=express.Router()

router.post('/createProduct',upload.array('images', 5),createProduct)
router.get('/getallProduct',getAllProducts)
router.get('/getproductbyid/:id',getProductsById)
router.put('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)

export  default router
