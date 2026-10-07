// const express=require('express');
// const {protect}=require('../middleware/authMiddleware');
// const {admin}=require('../middleware/adminMiddleware');
// const {createOrder,getOrders,myOrders,updateOrderStatus,deleteOrder}=require('../controller/orderController');

// const router=express.Router();

// router.route('/').post(protect,createOrder).get(protect,admin,getOrders);
// router.route('/myorders').get(protect,myOrders);
// router.route('/:id').put(protect,admin,updateOrderStatus);
// router.route('/:id').delete(protect,admin, deleteOrder);
// module.exports=router;

// 📄 backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  updateOrderToDelivered, 
  getAllOrders 
} = require('../controller/orderController');

// Agar aapke paas auth middleware h to use yahan laga sakte hain, 
// abhi testing k liye hum direct endpoints map kar rahe hain taaki crash na ho.

// 🎯 Base Route: /api/orders
router.route('/')
  .post(createOrder)      // Step 2: Create Order
  .get(getAllOrders);     // Admin: Get all store orders

// 🎯 Route: /api/orders/myorders (Dhyan rakhein yeh /:id se upar hona chahiye!)
router.route('/myorders')
  .get(getMyOrders);      // Step 3: Get logged in user orders

// 🎯 Route: /api/orders/:id
router.route('/:id')
  .get(getOrderById)
  .put(updateOrderToDelivered);

module.exports = router;