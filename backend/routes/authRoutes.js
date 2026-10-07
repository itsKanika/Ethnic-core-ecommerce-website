// const express = require('express');
// const router =express.Router();

// // This safe-check prevents the crash and tells you exactly what's wrong
// if (!authController || !authController.registerUser) {
//     console.log("❌ ERROR: authController is not exporting registerUser properly!");
//     console.log("Current authController exports:", authController);
// }

// const {registerUser,loginUser,getUsers} = require("../controller/authController");
// const {protect}=require('../middleware/authMiddleware');
// const {admin} = require('../middleware/adminMiddleware');

// router.post('/register',registerUser);
// router.post('/login',loginUser);
// router.get('/users',protect,getUsers);
// module.exports=router;

// 📄 backend/routes/authRoutes.js ke andar check kijiye
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyEmail } = require('../controller/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

// 🎯 Yeh line line number 38 ke aas-pass honi chahiye:
router.post('/verify-email', verifyEmail); 

module.exports = router;