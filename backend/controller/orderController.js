// const Order=require('../models/order');
// const sendEmail=require('../utils/sendEmail');

// //create order
// const createOrder=async(req,res)=>{
   
//     try{
//          const {items,totalAmount,address,paymentId} =req.body;
//          if(!items || items.length==0 || !totalAmount || !address || !paymentId){
//             return res.status(400).json({message:'Invalid order data'});
//     } 
// else{
//     const order=new Order({
//         user:req.user._id,
//         items,
//         totalAmount,
//         address,
//         paymentId
//     }); await order.save();

// const message=`Dear ${req.user.name},\n\nThank you for your order! Your order has been created successfully. Here are the details:\n\nOrder ID: ${order._id}\nTotal Amount: ${order.totalAmount}\nShipping Address: ${address}\n\n Payment ID: ${order.paymentId}\n\nWe will notify you once your order is shipped.\n\nThank you for shopping with us!\n\nBest regards,\nE-commerce Team`;

//     await sendEmail(req.user.email,'Order Created','Your order has been created successfully!',message);

//     res.status(201).json({message:'Order created successfully',order});

// }
//     } catch(error){
//         res.status(500).json({message:"Error creating order",error});
//     }
// }; 


// const myOrders=async(req,res)=>{
//     try{
//         const orders=await Order.find({user:req.user._id}).populate('items.productId','name price');
//         res.json(orders);
//     } catch(error){ res.status(500).json({message:"Error fetching orders",error});}
// };

// const getOrders=async(req,res)=>{
//     try{ const orders=await Order.find({}).populate('userId','id name').populate('items.productId','name price');
//         res.json(orders);}
// catch (error){ res.status(500).json({message:"Error fetching orders",error});} }

// const updateOrderStatus=async(req,res)=>{
//     try { const {status}=req.body;
//         const order=await Order.findById(req.params.id);
//         if(order){ order.status=status; await order.save();
//             res.json({message:'Order status updated',order});}
//         else{ res.status(404).json({message:'Order not found'});}
//         } catch(error){ res.status(500).json({message:"Error updating order status",error}); 

// }

// const deleteOrder = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
        
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         await Order.findByIdAndDelete(req.params.id);
//         return res.json({ message: 'Order deleted successfully' });
        
//     } catch (error) {
//         return res.status(500).json({ message: "Error deleting order", error: error.message });
//     }
// };

// module.exports={createOrder,myOrders,getOrders,updateOrderStatus ,deleteOrder
        
// }
// 📄 backend/controller/orderController.js
// IMPORTANT: Poori file me 'Order' aur 'sendEmail' sirf ek hi baar top par declared hain!

const Order = require('../model/Order'); // Check paths: 'model/Order' or 'models/Order'
const sendEmail = require('../utils/sendEmail');

// 1. CREATE NEW ORDER (With Safety Bypass for Mail & Empty Database)
const createOrder = async (req, res) => {
  console.log("📡 Incoming Request: Creating Order inside MongoDB...");
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    // Validation to prevent crash on empty items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Direct MongoDB Write
    const newOrder = await Order.create({
      user: req.user ? req.user._id : "6a3ec41d3d2bf5466b53a0e6", // Fallback dummy ID if auth middleware is blank
      items,
      totalAmount,
      address,
      paymentId,
      isPaid: true,
      paidAt: Date.now()
    });

    console.log("✅ SUCCESS: Order written to MongoDB collection successfully!");

    // 🎯 NODEMAILER SAFETY BLOCK (Iske errors code crash nahi karenge)
    try {
      // Safe fallback string checks to never let recipient be undefined
      const recipientEmail = req.user && req.user.emails ? req.user.emails : "kanikatest20145@gmail.com";
      
      console.log(`📧 Attempting to send confirmation mail to: ${recipientEmail}`);

      await sendEmail({
        email: recipientEmail, 
        subject: 'ShopNest - Order Placed Successfully! 🎉',
        message: `Thank you for shopping! Your order of Rs.${totalAmount} has been received.`,
        html: `<h3>Your order with Payment ID ${paymentId} is confirmed!</h3>`
      });

      console.log("✅ Mail wrapper executed successfully!");
    } catch (mailError) {
      // SMTP errors logging without stopping the execution pipeline
      console.error("🚨 Nodemailer Error (Order is still saved!):", mailError.message);
    }

    // 201 Response always fires here regardless of email status
    return res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: newOrder
    });

  } catch (error) {
    console.error("❌ Core Order Controller Error:", error.message);
    return res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

// 2. GET LOGGED IN USER ORDERS
const getMyOrders = async (req, res) => {
  console.log("📡 Incoming Request: Fetching My Orders...");
  try {
    const userId = req.user ? req.user._id : "6a3ec41d3d2bf5466b53a0e6";
    const orders = await Order.find({ user: userId });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch My Orders Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. GET ORDER BY ID (Admin/User Specific)
const getOrderById = async (req, res) => {
  console.log(`📡 Incoming Request: Fetching Order ID: ${req.params.id}`);
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name emails');
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ Fetch Single Order Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4. UPDATE ORDER TO DELIVERED (Admin Only Status tracking)
const updateOrderToDelivered = async (req, res) => {
  console.log(`📡 Incoming Request: Updating Status for Order ID: ${req.params.id}`);
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("❌ Update Delivery Status Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5. GET ALL ORDERS (Admin Only View)
const getAllOrders = async (req, res) => {
  console.log("📡 Incoming Request: Fetching All Store Orders...");
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    return res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Fetch All Store Orders Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// All methods exported cleanly
module.exports = { 
  createOrder, 
  getMyOrders, 
  getOrderById, 
  updateOrderToDelivered, 
  getAllOrders 
};