
const Order = require("../model/Order")

const createOrder = async (req, res) => {
    try {
        const order = new Order({ ...req.body, user: req.user.id });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getOrder =  async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('orderItems.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderItems.product');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports ={createOrder,getOrder,getOrderById}