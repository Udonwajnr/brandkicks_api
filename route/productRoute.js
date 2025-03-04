const express = require("express");
const router = express.Router()
const {getProduct,getProductbySlug,createProduct,updateProduct,deleteProduct} = require("../controller/productController")
const {authenticate,authorizeAdmin} = require('../middleware/authenticate')

router.get('/',getProduct)
router.get("/:slug",getProductbySlug)
router.post("/", authenticate, authorizeAdmin,createProduct)
router.put('/:slug', authenticate, authorizeAdmin,updateProduct)
router.delete('/:slug', authenticate, authorizeAdmin,deleteProduct)

module.exports = router