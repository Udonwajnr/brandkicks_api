const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDb = require("./config/db.js");
const ServerlessHttp = require("serverless-http");

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        process.env.CLIENTSIDE_URL    
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
app.get("/.netlify/functions/index",(req,res)=>{
  return res.json({message:"hello world"})
})

app.get("/", (req, res) => {
  sendResponse(res, 200, "Hello World! This is a success message");
});
app.use("/api/",require("./route/authenticate.js"))
app.use("/api/user",require("./route/userRoute.js"))
app.use("/api/products",require("./route/productRoute.js"))
app.use("/api/order",require("./route/orderRoute.js"))

const handler = ServerlessHttp(app)

module.exports.handler = async(event,context)=>{
  const result = await handler(event,context);
  return result
}
connectDb();
app.listen(port, () => {
  console.log(`This is running on port ${port}`.green.bold);
});
