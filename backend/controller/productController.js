// // const Product=require('../model/Product');
// // const cloudinary=require('../config/cloudinary');
  
// // const getProduct =async(req,res)=>{
// //     try{
// //         const products=await Product.find({});
// //         res.json(products);
// //     } catch(error){
// //         res.status(500).json({message:"Server error"});

// //     }
// // }
// // const getProductById=async(req,res)=>{
// //     try{
// //         const product=await Product.findById(req.params.id);
// //         if(product){
// //             res.json(product); }
// //         else{ res.status(400).json({message:"Product not found"});
// //     } } catch(error){
// //         res.status(500).json({message:"Server error"});
// //     }
// // };
// // const createProduct=async(req,res)=>{

// //     try{

// //     const{ name,description,price,category,stock}=req.body;
// //     let imageUrl='';
// //     if(req.file){
// //         const result=await cloudinary.uploader.upload(req.file.path);
// //         imageUrl=result.secure_url;
// //     }
// //     const product=new Product({
// //         name,
// //         description,
// //         price,
// //         category,
// //         stock,
// //         imageUrl
// //     });

// //     } };

// // const updateProduct=async(req,res)=>{
// //      try{
// //         const {name,description,price,category,stock}=req.body;
// //       try{
// //              const {name,description,price,category,stock}=req.body;
// //              const product=await Product.findById(req.params.id);
// //                 if(product){
// //                     product.name=name||product.name;
// //                     product.description=description||product.description;
// //                     product.price=price||product.price;
// //                     product.category=category||product.category;
// //                     product.stock=stock||product.stock;
// //                     if(req.file){
// //                         const result=await cloudinary.uploader.upload(req.file.path);
// //                         console.log(result);
// //                         product.imageUrl=result.secure_url;
// //                     }
// //                     const updatedProduct=await product.save();
// //                     res.json(updatedProduct);
// //                 } else{ res.status(404).json({message:"Product not found"});
// //             }
// //            } catch(error){ res.status(500).json({message:"Server error"});} };

// // const deleteProduct=async(req,res)=>{
// //      try{
// //     const product=await Product.findById(req.params.id);

// //     if(product){
// //         await product.deleteOne();
// //         res.json({message:"Product removed"});
 
// // } else {
// //     res.status(400).json({ message:"Product not found"});
// // } } catch(error){ res.status(500).json({message:"Server error"});}
// // };
// // module.exports={getProduct,getProductById,
// //     createProduct,updateProduct,deleteProduct} };


// const Product = require('../model/Product');
// const cloudinary = require('../config/cloudinary');

// // 1. Get All Products
// const getProduct = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // 2. Get Product By ID
// const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // 3. Create Product (FIXED)
// const createProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, stock } = req.body;
//         let imageUrl = '';
        
//         if (req.file) {
//             const result = await cloudinary.uploader.upload(req.file.path);
//             imageUrl = result.secure_url;
//         }
        
//         const product = new Product({
//             name,
//             description,
//             price,
//             category,
//             stock,
//             imageUrl
//         });

//         const createdProduct = await product.save();
//         res.status(201).json(createdProduct);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // 4. Update Product (FIXED)
// const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, stock } = req.body;
//         const product = await Product.findById(req.params.id);
        
//         if (product) {
//             product.name = name || product.name;
//             product.description = description || product.description;
//             product.price = price || product.price;
//             product.category = category || product.category;
//             product.stock = stock || product.stock;
            
//             if (req.file) {
//                 const result = await cloudinary.uploader.upload(req.file.path);
//                 product.imageUrl = result.secure_url;
//             }
            
//             const updatedProduct = await product.save();
//             res.json(updatedProduct);
//         } else {
//             res.status(404).json({ message: "Product not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// };




// module.exports = {
//     getProduct,
//     getProductById,
//     createProduct,
//     updateProduct,

// };

// const Product = require('../model/Product'); // Check paths: 'model/Product' or 'models/Product'

// // 1. CREATE NEW PRODUCT (Admin Only)
// const createProduct = async (req, res) => {
//   console.log("📡 Incoming Request: Creating Product inside MongoDB...");
//   try {
//     const { name, description, price, category, stock, imageUrl } = req.body;

//     // Field validations to prevent schema crash
//     if (!name || !price || !category) {
//         return res.status(400).json({ message: "Name, price, and category are required!" });
//     }

//     // Water-proof DB write matching 'imageUrl' schema key
//     const newProduct = await Product.create({
//       name,
//       description,
//       price: Number(price),
//       category,
//       stock: Number(stock) || 0,
//       imageUrl: imageUrl || req.body.image || "https://example.com/placeholder.jpg"
//     });

//     console.log("✅ SUCCESS: Product written to MongoDB collection successfully!");
//     return res.status(201).json(newProduct);

//   } catch (error) {
//     console.error("❌ Core Product Create Error:", error.message);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // 2. GET ALL PRODUCTS (Public Route)
// // 📄 backend/controller/productController.js

// const getProducts = async (res, req) => {
//   try {
//     const { category, subCategory, size, minPrice, maxPrice } = req.query;
//     let queryObj = {};

//     // 1. Main Category Filter (Men, Women, Kids, Accessories)
//     if (category) {
//       queryObj.category = { $regex: category, $options: 'i' }; // Case-insensitive matching
//     }

//     // 2. Sub-Category Filter (Shirt, Tshirt, Kurti)
//     if (subCategory) {
//       queryObj.subCategory = subCategory;
//     }

//     // 3. Size Filter (S, M, L, XL)
//     if (size) {
//       queryObj.size = size; // Schema me array ya string ho, mongoose ise handle kar leta hai
//     }

//     // 4. Price Filter Range (e.g., 500 se 2000 tak)
//     if (minPrice || maxPrice) {
//       queryObj.price = {};
//       if (minPrice) queryObj.price.$gte = Number(minPrice);
//       if (maxPrice) queryObj.price.$lte = Number(maxPrice);
//     }

//     // Database se filtered products nikalna
//     const products = await Product.find(queryObj);
//     return res.status(200).json(products);

//   } catch (error) {
//     return res.status(500).json({ message: "Error fetching filtered products", error: error.message });
//   }
// };
// // 3. GET SINGLE PRODUCT BY ID (Public Route)
// const getProductById = async (req, res) => {
//   console.log(`📡 Incoming Request: Fetching Product ID: ${req.params.id}`);
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found!" });
//     }
//     return res.status(200).json(product);
//   } catch (error) {
//     console.error("❌ Fetch Single Product Error:", error.message);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // 4. UPDATE PRODUCT (Admin Only)
// const updateProduct = async (req, res) => {
//   console.log(`📡 Incoming Request: Updating Product ID: ${req.params.id}`);
//   try {
//     const { name, description, price, category, stock, imageUrl } = req.body;

//     // 1. Check if product exists
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found inside MongoDB!" });
//     }

//     // 2. Fallback objects directly inject to prevent casting type errors
//     product.name = name || product.name;
//     product.description = description || product.description;
//     product.price = price !== undefined ? price : product.price;
//     product.category = category || product.category;
//     product.stock = stock !== undefined ? stock : product.stock;
//     product.imageUrl = imageUrl || product.imageUrl;

//     // 3. Save to MongoDB
//     const updatedProduct = await product.save();
    
//     console.log("✅ SUCCESS: Product updated inside MongoDB collection!");
//     return res.status(200).json(updatedProduct);

//   } catch (error) {
//     console.error("❌ Backend Update Product Crash Error:", error.message);
//     return res.status(500).json({ 
//       message: "Server error while updating product", 
//       error: error.message 
//     });
//   }
// };

// // 5. DELETE PRODUCT (Admin Only)
// const deleteProduct = async (req, res) => {
//   console.log(`📡 Incoming Request: Deleting Product ID: ${req.params.id}`);
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found!" });
//     }

//     await Product.findByIdAndDelete(req.params.id);
//     console.log("✅ SUCCESS: Product removed from MongoDB!");
//     return res.status(200).json({ message: "Product deleted successfully!" });

//   } catch (error) {
//     console.error("❌ Delete Product Error:", error.message);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // All 5 core CRUD methods exported safely
// module.exports = { 
//   createProduct, 
//   getProducts, 
//   getProductById, 
//   updateProduct, 
//   deleteProduct 
// };


const mongoose = require('mongoose');
const Product = require('../model/Product'); 

// 🎯 1. GET ALL PRODUCTS 
const getProducts = async (req, res) => {
  try {
    let query = {};
    if (req.query.category) query.category = { $regex: `^${req.query.category}$`, $options: 'i' };
    if (req.query.subCategory) query.subCategory = { $regex: `^${req.query.subCategory}$`, $options: 'i' };

    const sizeParam = req.query.sizes || req.query.size;
    if (sizeParam) {
      let sizeArray = [];
      if (Array.isArray(sizeParam)) {
        sizeArray = sizeParam.map(s => s.trim().replace(/[\[\]"']/g, ''));
      } else if (typeof sizeParam === 'string') {
        sizeArray = sizeParam.replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
      }
      query.sizes = { $in: sizeArray }; 
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error while fetching products", error: error.message });
  }
};

// 🎯 2. GET SINGLE PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid Hex product ID format!" });

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found inside MongoDB store!" });
    
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server product identification failed", error: error.message });
  }
};

// 🎯 3. CREATE NEW PRODUCT 
const createProduct = async (req, res) => {
    try {
        const { name, price, category, subCategory, stock, description } = req.body;
        
        let parsedSizes = ["Free Size"];
        if (req.body.sizes) {
            if (Array.isArray(req.body.sizes)) {
                parsedSizes = req.body.sizes.map(s => s.trim().replace(/[\[\]"']/g, ''));
            } else if (typeof req.body.sizes === 'string') {
                parsedSizes = req.body.sizes.replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
            }
        }
        
        if (parsedSizes.length === 0 || (parsedSizes.length === 1 && parsedSizes[0] === "")) {
            parsedSizes = ["Free Size"];
        }

        const newProduct = new Product({
            name,
            price: Number(price),
            category: category ? category.toUpperCase() : 'WOMENS', 
            subCategory: subCategory || 'Curated',
            stock: Number(stock) || 10,
            description,
            sizes: parsedSizes,
            image: req.file ? `/uploads/${req.file.filename}` : '' 
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "Server database serialization error", error: err.message });
    }
};

// 🎯 4. UPDATE PRODUCT 
const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Target database document missing!" });

    if (req.body.sizes) {
        if (!Array.isArray(req.body.sizes)) {
            req.body.sizes = req.body.sizes.replace(/[\[\]"']/g, '').split(',').map(s => s.trim());
        } else {
            req.body.sizes = req.body.sizes.map(s => s.trim().replace(/[\[\]"']/g, ''));
        }
    }

    if (req.body.category) req.body.category = req.body.category.toUpperCase();

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Update action pipeline failure", error: error.message });
  }
};

// 🎯 5. DELETE PRODUCT 
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Target document asset not found!" });

    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Document successfully purged from database!" });
  } catch (error) {
    return res.status(500).json({ message: "Server drop operation error", error: error.message });
  }
};

module.exports = { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
};