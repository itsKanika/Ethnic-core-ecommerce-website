// 📄 backend/controller/categoryController.js
import Category from '../model/Category.js'; // 🎯 End mein .js lagana absolute zaroori hai!

// 1. GET ALL CATEGORIES WITH SUB-CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

// 2. ADMIN CONTROL: POST / CREATE OR UPDATE CATEGORY TYPES
export const createOrUpdateCategory = async (req, res) => {
  try {
    const { name, subCategories } = req.body; // subCategories should be an array of strings

    if (!name) {
      return res.status(400).json({ message: "Category name is strictly required" });
    }

    // Agar category already hai, toh replace/update types, nahi toh create new document
    const updatedCategory = await Category.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${name}$`, 'i') } },
      { name, subCategories },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Category matrix sync success!", data: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error configuring dynamic admin fields", error: error.message });
  }
};