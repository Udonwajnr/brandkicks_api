
const Product = require("../model/Product")
const upload = require("../upload/multerConfig")

const getProduct = async (req, res) => {
    try {
        const { search, color, size, brand, gender, newlyAdded, page = 1, limit = 20 } = req.query;
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
        // Ensure req.files exists and photos are uploaded
        console.log(req)
        const images = req.files?.images
            ? req.files.images.map((file) => file.path) // Extract Cloudinary URLs
            : [];

        // Create the product with all fields, including images
        const product = new Product({
            ...req.body,  // Spread body fields
            images       // Add the uploaded photos
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const updateProduct = async (req, res) => {
    try {
        // Find the existing product by slug
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Use the images from req.body if provided, otherwise keep the old ones
        let updatedImages = req.body.images || product.images;

        // If new images are uploaded, add them to the updated list
        if (req.files?.images) {
            const newImages = req.files.images.map((file) => file.path); // Extract new image URLs
            updatedImages = [...updatedImages, ...newImages]; // Merge new images with updated images from frontend
        }

        // Update the product with new data
        const updatedProduct = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            { ...req.body, images: updatedImages }, // Directly update images with frontend data
            { new: true, runValidators: true }
        );

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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