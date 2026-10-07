# 🛍️ Ethnic Core — E-Commerce Website

**Ethnic Core** is a full-stack e-commerce website built to provide a simple and user-friendly shopping experience for ethnic fashion products. The project includes a React frontend, Node.js/Express backend, database integration, authentication, product management, and image hosting through Cloudinary.

## ✨ Features

- 🛒 Browse and view products
- 🔍 Product search and filtering
- 👤 User registration and login
- 🔐 Authentication and protected routes
- 🛍️ Add products to cart
- 📦 Product and order management
- 🖼️ Cloudinary image upload and storage
- 💳 E-commerce checkout flow
- 📱 Responsive UI
- ⚡ REST API based backend
- 🗄️ Database integration

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database & Services
- MongoDB
- Cloudinary

### Tools
- Git & GitHub
- VS Code
- Postman
- npm

## Demo Link
https://drive.google.com/file/d/160BUQ4_W5heRdKTKLsylnHKi7IGgyAMn/view



## 📁 Project Structure

```text
Ethnic-core-ecommerce-website/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/itsKanika/Ethnic-core-ecommerce-website.git
```

```bash
cd Ethnic-core-ecommerce-website
```

### 2. Install dependencies

From the project root:

```bash
npm run install-all
```

Or install them separately:

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install --legacy-peer-deps
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note:** Never commit your `.env` file or expose API keys and secrets publicly.

## ▶️ Run the Project

From the root directory:

```bash
npm run dev
```

This starts both the frontend and backend.

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

### Run Separately

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm start
```

## 🔄 Application Flow

```text
User
  ↓
React Frontend
  ↓
REST API
  ↓
Node.js + Express
  ↓
MongoDB
  ↓
Response
  ↓
React UI
```

For product images:

```text
Admin/Product Upload
        ↓
Backend
        ↓
Cloudinary
        ↓
Image URL
        ↓
Database
        ↓
Frontend
```

## 🔐 Security

The project uses:

- JWT-based authentication
- Protected API routes
- Environment variables for sensitive credentials
- Backend validation
- Secure password handling

## 📸 Screenshots

Add screenshots of the project here:

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
├── cart.png
└── login.png
```

You can then add them to this section:

```markdown
![Home Page](screenshots/home.png)
```

## 🎯 Learning Outcomes

Through this project, I worked with:

- Full-stack web development
- React component-based architecture
- REST API development
- Authentication and authorization
- MongoDB database operations
- Image upload and cloud storage
- Frontend-backend integration
- Git and GitHub
- Environment configuration

## 🔮 Future Improvements

- Online payment integration
- Order tracking
- Wishlist functionality
- Product reviews and ratings
- Admin dashboard
- Advanced product recommendations
- Improved search and filtering

used ai generated images for refrence only
## 👩‍💻 Author

**Kanika Gupta**

- GitHub: [@itsKanika](https://github.com/itsKanika)
- LinkedIn: [Kanika Gupta](https://www.linkedin.com/in/kanika-gupta369/)

---

⭐ If you found this project useful, consider giving the repository a star!
