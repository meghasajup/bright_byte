import express from "express";
import productRoute from './productRoute.js'
import adminRoute from './adminRoute.js'
import categoryRoute from './categoryRoute.js'
import contactRoute from './contactRoute.js'
import invoiceRoute from './invoiceRoute.js'
import notifyRoute from './notifyRoute.js'
const v1Router=express.Router()


v1Router.use('/product',productRoute)
v1Router.use('/admin',adminRoute)
v1Router.use('/category',categoryRoute)
v1Router.use('/contact',contactRoute)
v1Router.use('/invoice',invoiceRoute)
v1Router.use('/notify',notifyRoute)
export default v1Router