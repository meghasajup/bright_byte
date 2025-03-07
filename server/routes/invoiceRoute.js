import express from "express"
import { getAllInvoices, getInvoiceById, invoiceAdd } from "../controllers/invoiceController.js"


const router=express.Router()


router.post('/createinvoice',invoiceAdd)
router.get('/getallinvoice',getAllInvoices)
router.get('/getbyidinvoice/:id',getInvoiceById)

export  default router
