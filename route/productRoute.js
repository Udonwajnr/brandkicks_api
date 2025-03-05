const express = require("express");
const router = express.Router()
const {getProduct,getProductbySlug,createProduct,updateProduct,deleteProduct} = require("../controller/productController")
const {authenticate,authorizeAdmin} = require('../middleware/authenticate')
const upload = require("../upload/multerConfig")

router.get('/',getProduct)
router.get("/:slug",getProductbySlug)
router.post("/", authenticate, authorizeAdmin, upload.fields([
    { name: 'images', maxCount: 5 }, // Allow up to 5 photos
  ]),createProduct)
router.put('/:slug', authenticate, authorizeAdmin,upload.fields([
  { name: 'images', maxCount: 5 }, // Allow up to 5 photos
]),updateProduct)
router.delete('/:slug', authenticate, authorizeAdmin,deleteProduct)

module.exports = router