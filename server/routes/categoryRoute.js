import express from "express"
import { verifyToken } from "../middleware/verifyAdminToken.js"
import { categoryAdd, getAllCategories } from "../controllers/categoryController.js"
import { upload } from "../config/multer.js"


const router=express.Router()


router.post('/create',upload.single('image'),verifyToken,categoryAdd)
router.get('/getall',getAllCategories)

export  default router
