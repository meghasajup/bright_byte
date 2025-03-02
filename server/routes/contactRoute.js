import express from "express"
import { newContact } from "../controllers/conatctController.js"


const router=express.Router()


router.post('/createcontact',newContact)

export  default router
