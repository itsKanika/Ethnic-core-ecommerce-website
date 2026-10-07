const nodemailer = require('nodemailer');

// 🎯 FIX: Function ka naam strictly 'sendEmail' rakhna hai taaki reference error na aaye
const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"ShopNest" <${process.env.EMAIL_USER}>`,
    to: options.email, // Targets user email string
    subject: options.subject,
    text: options.message,
    html: options.html, 
  };

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

// 🎯 Ab yeh safely reference dhoondh lega aur bina crash ke export hoga!
module.exports = sendEmail;