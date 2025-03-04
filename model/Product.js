const slugify = require('slugify');
const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String },
    color: { type: [String] },
    size: { type: [String] },
    brand: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Unisex'] },
    newlyAdded: { type: Boolean, default: false }
}, { timestamps: true });

// Middleware to generate slug before saving
ProductSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.model('Product', ProductSchema);
module.exports=Product