import express from "express"
import upload from "../config/multer.js"
import { verifyToken } from "../middleware/verifyAdminToken.js"
import { categoryAdd, getAllCategories } from "../controllers/categoryController.js"


const router=express.Router()


router.post('/create',upload.single('image'),verifyToken,categoryAdd)
router.get('/getall',getAllCategories)

export  default router
