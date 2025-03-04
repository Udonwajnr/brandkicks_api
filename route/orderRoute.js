const express = require('express');
const router = express.Router()
const {createOrder,getOrder,getOrderByNumber} = require("../controller/orderController")
const {authenticate,authorizeAdmin} =  require("../middleware/authenticate")

// only authenticated user and user whose isadmin(model) is true
router.get('/' , authenticate,authorizeAdmin ,getOrder)
// only authenticated user and user whose isadmin(model) is true
router.get('/:orderNumber' ,authenticate,authorizeAdmin ,getOrderByNumber)
// user must be authenticated to use this route
router.post("/",authenticate , createOrder)

module.exports = router