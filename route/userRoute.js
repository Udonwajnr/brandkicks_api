const express = require('express');
const router = express.Router()
const {login,register,getAllUsers,getUserById,} = require("../controller/userController")
const {authorizeAdmin,authenticate} = require("../middleware/authenticate")

router.post('/register',register)
router.post('/login', login)
router.get("",getAllUsers)
router.get(":/id",getUserById)


module.exports = router