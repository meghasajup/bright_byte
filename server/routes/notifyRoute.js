import express from "express"
import { notify } from "../controllers/notificationController.js"


const router=express.Router()


router.post('/make',notify)
export  default router
