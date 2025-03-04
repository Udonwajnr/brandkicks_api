const express = require("express")
const app = express()
const {authenticate,authorizeAdmin} = require("../middleware/authenticate")

app.get('/user/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});

module.exports = app;