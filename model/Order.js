const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    user: { type:
        mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
        },
    orderItems: [{
        product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true },
        name: { type: String,
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
         enum: ['pending', 'paid'],
         default: 'pending'
         },
    orderStatus: { 
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'canceled'],
        default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports=Order
