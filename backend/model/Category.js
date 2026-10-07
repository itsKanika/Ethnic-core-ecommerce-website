// 📄 backend/model/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Men", "Women"
  subCategories: [{ type: String }] // e.g., ["Shirt", "Tshirt", "Kurti"]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);