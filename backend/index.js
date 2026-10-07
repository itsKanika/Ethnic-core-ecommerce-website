// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/",(req,res)=>{
//     res.send("workingggg");
// });

// app.use('/api/auth',require('./routes/authRoutes'));
// app.use('/api/products',require('./routes/productRoutes'));
// // app.use('/api/auth',require('./routes/authRoutes'));
// app.use('/api/orders',require('./routes/orderRoutes'));
// // app.use('/api/paymennts',require('./routes/paymentRoutes'));
// app.use('/api/analytics',require('./routes/analyticsRoutes'));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
// })

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path'); 

dotenv.config();

const app = express();

// Middlewares setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌟 Frontend ko 'uploads' folder ki images read karne ki permission dena
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🚀 CRITICAL SNOOPER (100% BUG-FREE)
app.use((req, res, next) => {
    console.log(`📡 Incoming Request: ${req.method} ${req.url}`);
    
    // 🎯 THE FIX: Pehle check karo ki req.body undefined toh nahi hai, tabhi aage bado!
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("📥 Raw Body Content:", req.body);
    }
    next();
});

// Base Route
app.get("/", (req, res) => {
    res.send("workingggg");
});

// 🔗 LINK ROUTES STRICTLY
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes')); 
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes')); 
// ... baki routes ...
app.use('/api/users', require('./routes/userRoutes'));

// 🚨 GLOBAL CATCHER
app.use((err, req, res, next) => {
    console.log("🔥 GLOBAL MIDDLEWARE CRASH DETECTED:");
    console.error(err.stack);
    res.status(500).json({ message: "Global middleware caught server error", error: err.message });
});

// Connect to Database and THEN Start listening
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running stable on port ${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Failed to initialize database connection:", err);
});