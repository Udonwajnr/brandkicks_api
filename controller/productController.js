
const Product = require("../model/Product")

const getProduct = async (req, res) => {
    try {
        const { search, color, size, brand, gender, newlyAdded, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (search) filter.name = new RegExp(search, 'i');
        if (color) filter.color = color;
        if (size) filter.size = size;
        if (brand) filter.brand = brand;
        if (gender) filter.gender = gender;
        if (newlyAdded) filter.newlyAdded = newlyAdded === 'true';
        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const getProductbySlug =async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateProduct= async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProduct =async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ slug: req.params.slug });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {getProduct,getProductbySlug,createProduct,updateProduct,deleteProduct}