
// // const express = require('express');

// // const { protect } = require('../middleware/authMiddleware');
// // const { admin } = require('../middleware/adminMiddleware');
// // const{getProduct,getProductById,createProduct,updateProduct,deleteProduct}=require('../controller/productController');
// // const multer=require('multer');
// // const upload=multer({dest:'uploads/'});

// // const router = express.Router();


// // //all products
// // router.route('/').get(getProducts).post(protect,admin,upload.single('image') , createProduct).delete(protect,admin);
// // //specific product
// // router.route('/:id').get(getProductById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct);


// // module.exports = router;
// const express = require('express');
// const { protect } = require('../middleware/authMiddleware');
// const { admin } = require('../middleware/adminMiddleware'); 

// // Yeh singular hai: getProduct
// const { 
//     getProduct, 
//     getProductById, 
//     createProduct, 
//     updateProduct, 
   
// } = require('../controller/productController');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const router = express.Router();

// // 🛑 LINE 14 FIXED: getProducts ko badal kar getProduct kar diya hai aur delete handler clean kiya hai:
// router.route('/')
//     .get(getProduct) 
//     .post(protect, admin, upload.single('image'), createProduct); 

// // Specific product route


// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
// Path ko apni actual folder structure ke hisab se set karein
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controller/productController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;