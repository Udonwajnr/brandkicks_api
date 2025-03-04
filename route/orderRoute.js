const express = require('express');
const router = express.Router()
const {createOrder,getOrder,getOrderById} = require("../controller/orderController")
const {authenticate,authorizeAdmin} =  require("../middleware/authenticate")

// only authenticated user and user whose isadmin(model) is true
router.get('/:id' ,authenticate,authorizeAdmin ,getOrderById)
// user must be authenticated to use this route
router.get('/' , authenticate,authorizeAdmin ,getOrder)
// user must be authenticated to use this route
router.post("/",authenticate , createOrder)

module.exports = router