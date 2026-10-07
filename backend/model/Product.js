const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // MENS, WOMENS, etc.
    subCategory: { type: String },
    stock: { type: Number, default: 10 },
    description: { type: String },
    image: { type: String }, // String path for uploaded images
    
    // 🎯 FIX: Explicitly mapping size as a clean array of strings
    sizes: { 
        type: [String], 
        default: ["Free Size"] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);