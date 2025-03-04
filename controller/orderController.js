
const Order = require("../model/Order")

const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, user: req.user.id });
        await order.save();

        // Populate user details when returning the saved order
        const populatedOrder = await Order.findById(order._id).populate('user', 'name email');

        res.status(201).json(populatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('user', 'name email') // Populate user details
            .populate('orderItems.product'); // Populate product details
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderByNumber = async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber })
            .populate('user', 'name email') // Populate user details
            .populate('orderItems.product'); // Populate product details

        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports ={createOrder,getOrder,getOrderByNumber}