const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDb = require("./config/db.js");

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",    
      ];
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  
const port = 8000;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sendResponse = (res, statusCode, message, data = null) => {
return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
});
};


app.get("/", (req, res) => {
  sendResponse(res, 200, "Hello World! This is a success message");
});
app.use("/api/",require("./route/authenticate.js"))
app.use("/api/user",require("./route/userRoute.js"))
app.use("/api/products",require("./route/productRoute.js"))
app.use("/api/order",require("./route/orderRoute.js"))

connectDb();
app.listen(port, () => {
  console.log(`This is running on port ${port}`.green.bold);
});
