const mongoose = require("mongoose");
const { nanoid } = require("nanoid"); // Generates unique short IDs

const OrderSchema = new mongoose.Schema({
    orderNumber: { 
        type: String, 
        unique: true, 
        default: () => `ORD-${nanoid(8).toUpperCase()}` // Generates something like ORD-ABCD1234
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    orderItems: [{
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product", 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        }
    }],
    shippingAddress: { 
        type: String, 
        required: true 
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    paymentStatus: { 
        type: String, 
        enum: ["pending", "paid"], 
        default: "pending" 
    },
    orderStatus: { 
        type: String, 
        enum: ["pending", "shipped", "delivered", "canceled"], 
        default: "pending" 
    }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
