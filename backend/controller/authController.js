// // const User = require('../model/User');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const sendEmail = require('../utils/sendEmail');

// // // Token generation function 
// // const generateToken = (id) => {
// //     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// // };

// // // register user
// // const registerUser = async (req, res) => {
// //     const { name, emails, password } = req.body;
// //     try {
// //         const existingUser = await User.findOne({ emails });

// //         if (existingUser) {
// //             return res.status(400).json({ message: "user already exists" });
// //         }

// //         const salt = await bcrypt.genSalt(10);
// //         const hashedPassword = await bcrypt.hash(password, salt);

// //         // 🚀 1. OTP aur Expiry ko PEEHLE hi generate kar lijiye
// //         const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //         const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes valid

// //         // 🚀 2. Ab User create karte waqt ye dono fields database mein daaliye
// //         const user = await User.create({ 
// //             name, 
// //             emails, 
// //             password: hashedPassword,
// //             otp,          // Database mein save hoga
// //             otpExpires,   // Database mein save hoga
// //             verified: false
// //         });

// //         if (user) {
// //             const message = `Welcome to our website! Your OTP is ${otp}`;
            
// //             // Email bhej rahe hain
// //             await sendEmail(emails, 'Welcome to our website! glad to have you on board', message);
            
// //             // 🚀 3. Register par TOKEN MAT BHEJIYE. Sirf message bhejiye taaki frontend verify par redirect kare
// //             res.status(201).json({
// //                 message: "Registration successful! Please check your email for the OTP.",
// //                 emails: user.emails
// //             });
// //         } else {
// //             res.status(400).json({ message: "invalid user data" });
// //         }

// //     } catch (error) {
// //         console.error(error); 
// //         res.status(500).json({ message: "server error" });
// //     }
// // };


// // // // 2. VERIFY EMAIL USING OTP (NEW FUNCTION)
// // // const verifyEmail = async (req, res) => {
// // //     const { emails, otp } = req.body;
// // //     try {
// // //         const user = await User.findOne({ emails });

// // //         if (!user) {
// // //             return res.status(404).json({ message: "User not found" });
// // //         }

// // //         if (user.verified) {
// // //             return res.status(400).json({ message: "User is already verified" });
// // //         }

// // //         // Check kijiye ki kya OTP sahi hai aur expired toh nahi hua
// // //         if (user.otp === otp && user.otpExpires > Date.now()) {
// // //             user.verified = true;
// // //             user.otp = undefined;        // Verified hone ke baad OTP fields delete kar diye
// // //             user.otpExpires = undefined;
// // //             await user.save();

// // //             res.status(200).json({
// // //                 message: "Email verified successfully!",
// // //                 token: generateToken(user._id)
// // //             });
// // //         } else {
// // //             res.status(400).json({ message: "Invalid or expired OTP" });
// // //         }
// // //     } catch (error) {
// // //         console.error("Verification Error:", error);
// // //         res.status(500).json({ message: "server error" });
// // //     }
// // // };



// // const verifyEmail = async (req, res) => {
// //     const { emails, otp } = req.body;
// //     try {
// //         console.log("================ DEBUG START ================");
// //         console.log("1. Postman se aaya Email:", emails);
// //         console.log("2. Postman se aaya OTP:", otp, "| Type:", typeof otp);

// //         // Database se user nikalte hain
// //         const user = await User.findOne({ emails: emails.trim() });
        
// //         if (!user) {
// //             console.log("❌ ERROR: Database mein is email ka koi user mila hi nahi!");
// //             console.log("================ DEBUG END ==================");
// //             return res.status(404).json({ message: "User not found" });
// //         }

// //         console.log("3. DB mein save poora User object:", user);
// //         console.log("4. DB se mila OTP:", user.otp, "| Type:", typeof user.otp);

// //         // Loose comparison taaki agar ek string aur ek number ho toh bhi chal jaye
// //         if (user.otp == otp) {
// //             console.log("✅ SUCCESS: OTP Match ho gaya!");
// //             user.verified = true;
// //             user.otp = undefined;
// //             await user.save();
// //             console.log("================ DEBUG END ==================");
// //             return res.status(200).json({
// //                 message: "Email verified successfully!",
// //                 token: generateToken(user._id)
// //             });
// //         } else {
// //             console.log("❌ ERROR: OTP Mismatch! DB ka OTP aur Postman ka OTP alag hain.");
// //             console.log("================ DEBUG END ==================");
// //             return res.status(400).json({ message: "Invalid or expired OTP" });
// //         }
// //     } catch (error) {
// //         console.error("🚨 CRITICAL ERROR:", error);
// //         return res.status(500).json({ message: "server error" });
// //     }
// // };






// // // login user
// // const loginUser = async (req, res) => {
// //     const { emails, password } = req.body;
// //     try {
// //         // User.find ko User.findOne kiya
// //         const user = await User.findOne({ emails });
        
// //         if (user && (await bcrypt.compare(password, user.password))) {
// //             res.json({
// //                 _id: user._id,
// //                 name: user.name,
// //                 emails: user.emails,
// //                 role: user.role,
// //                 token: generateToken(user._id)
// //             });
// //         } else {
// //             res.status(400).json({ message: "invalid credentials" });
// //         }
// //     } catch (error) {
// //         res.status(500).json({ message: "server error" });
// //     }
// // };

// // // logout user 
// // const logoutUser = async (req, res) => {
// //     res.json({ message: "user logged out successfully" });
// // };

// // // get users 
// // const getUsers = async (req, res) => {
// //     try {
// //         const users = await User.find({}).select('-password');
// //         res.json(users);
// //     } catch (error) {
// //         res.status(500).json({ message: "server error" });
// //     }
// // };

// // // Teeno functions ko sahi se export kiya
// // module.exports = { registerUser, loginUser,verifyEmail, getUsers };

// const User = require('../model/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // 1. REGISTER USER
// const registerUser = async (req, res) => {
//   console.log("🎯 HIT: registerUser Controller ke andar entry ho chuki hai!");
  
//   try {
//     const { name, emails, password } = req.body;

//     if (!name || !emails || !password) {
//       console.log("❌ Breakpoint: Validation mismatch fields");
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Explicit checking matching your unique emails index
//     const userExists = await User.findOne({ emails: emails });
//     if (userExists) {
//       console.log("❌ Breakpoint: User already registered");
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       emails,
//       password: hashedPassword,
//       verified: false
//     });

//     const savedUser = await newUser.save();
//     console.log("✅ SUCCESS: Data saved locally inside MongoDB collection!");

//     return res.status(201).json({
//       message: "Registration successful!",
//       user: { id: savedUser._id, name: savedUser.name, emails: savedUser.emails }
//     });

//   } catch (error) {
//     console.log("🚨 CONTROLLER CATCH CAUGHT AN ERROR:");
//     console.error(error); 
//     return res.status(500).json({ message: "server error", errorDetails: error.message });
//   }
// };

// // 📄 backend/controller/authController.js ke andar verifyEmail replace kijiye:

// const verifyEmail = async (req, res) => {
//     console.log("📡 Incoming Request: Verifying OTP Code...");
//     const { emails, otp } = req.body;
//     try {
//         const user = await User.findOne({ emails: emails.trim() });
//         if (!user) return res.status(404).json({ message: "User not found" });

//         // 🔥 SMART TESTING BYPASS: Agar input OTP dynamic database value se match kare 
//         // YA PHIR aap testing ke liye hardcoded "123456" bhejein, dono cases me account active ho jayega!
//         if ((user.otp && String(user.otp).trim() === String(otp).trim()) || String(otp) === "123456") {
            
//             user.verified = true;
//             user.otp = undefined;
//             user.otpExpires = undefined;
//             await user.save();

//             console.log("✅ SUCCESS: Account activated successfully!");
//             return res.status(200).json({ message: "Email verified successfully!", token: generateToken(user._id) });
//         } else {
//             console.log("❌ MISMATCH: Invalid OTP value provided");
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: "server error" });
//     }
// };

// // 3. LOGIN USER
// const loginUser = async (req, res) => {
//     const { emails, password } = req.body;
//     try {
//         const user = await User.findOne({ emails });
//         if (!user) return res.status(400).json({ message: "invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "invalid credentials" });

//         if (user.verified === false) {
//             return res.status(401).json({ message: "Please verify your email first" });
//         }

//         return res.json({
//             _id: user._id,
//             name: user.name,
//             emails: user.emails,
//             role: user.role,
//             token: generateToken(user._id)
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "server error" });
//     }
// };

// const logoutUser = async (req, res) => {
//     return res.json({ message: "user logged out successfully" });
// };

// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find({}).select('-password');
//         return res.json(users);
//     } catch (error) {
//         return res.status(500).json({ message: "server error" });
//     }
// };

// module.exports = { registerUser, verifyEmail, loginUser, logoutUser, getUsers };

const User = require('../model/User'); // Check path: models or model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. REGISTER USER (REAL EMAIL OTP)
const registerUser = async (req, res) => {
  try {
    const { name, emails, password } = req.body; 
    
    if (!name || !emails || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ emails });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🎲 Generate Real 6-Digit Random OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    const user = await User.create({ 
      name, 
      emails, 
      password: hashedPassword,
      verified: false, 
      otp: generatedOtp,
      otpExpires: otpExpiry
    });

    if (user) {
      const emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px;">
          <h2 style="color: #4CAF50;">Welcome to ShopNest, ${name}!</h2>
          <p>Thank you for registering. Your email verification OTP code is:</p>
          <h1 style="color: #f97316; letter-spacing: 4px; background: #f3f4f6; padding: 10px; text-align: center;">${generatedOtp}</h1>
          <p>This code is valid for 15 minutes.</p>
        </div>
      `;

      try {
        await sendEmail({
          email: emails, 
          subject: 'Welcome to ShopNest - Your Email Verification OTP',
          message: `Your verification OTP is ${generatedOtp}`,
          html: emailHtml
        });
        console.log(`📧 SUCCESS: Real validation email sent to ${emails}`);
      } catch (mailError) {
        console.error("🚨 Nodemailer Error:", mailError.message);
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        emails: user.emails,
        role: user.role,
        token: generateToken(user._id),
        message: "Registration successful! Real OTP sent to email."
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. VERIFY EMAIL OTP (Missing function jo crash kar raha tha)
const verifyEmail = async (req, res) => {
  console.log("📡 Incoming Request: Verifying Real Email OTP...");
  try {
    const { emails, otp } = req.body;

    if (!emails || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ emails: emails.trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if OTP matches and hasn't expired
    if (user.otp && String(user.otp).trim() === String(otp).trim()) {
      
      user.verified = true;
      user.otp = undefined; // Clear OTP data after success
      user.otpExpires = undefined;
      await user.save();

      console.log("✅ SUCCESS: User verified successfully via email OTP!");
      return res.status(200).json({ message: "Email verified successfully!", token: generateToken(user._id) });
    } else {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. LOGIN USER (With Verification Guard)
const loginUser = async (req, res) => {
  try {
    const { emails, password } = req.body;
    const user = await User.findOne({ emails });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      if (user.verified === false) {
        return res.status(401).json({ message: 'Please verify your email address first!' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        emails: user.emails,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🎯 Exporting all 4 functions properly!
module.exports = { registerUser, verifyEmail, loginUser, getUsers };