# Needs - Backend

## Overview
This is the backend service for the Multi-Vendor Grocery App, built using **Node.js**, **Express.js**, and **Firebase**. It handles authentication, product and vendor management, cart operations, order processing, and real-time updates.

## Tech Stack
- **Node.js** - JavaScript runtime for backend services
- **Express.js** - Lightweight framework for REST API
- **Firebase Firestore** - NoSQL database for data storage
- **Firebase Authentication** - User authentication and security
- **Firebase Cloud Functions** - Serverless execution for business logic
- **Firebase Storage** - Image and file handling
- **Zod** - Input validation for API requests
- **Cors & Helmet** - Security enhancements
- **Multer** - File upload handling

## Features
### 1. **Authentication & User Management**
- User & Vendor Registration (Email/Password, Google Sign-In)
- JWT-based Authentication (using Firebase Auth)
- Profile management (name, address, contact info)

### 2. **Vendor & Product Management**
- Vendor onboarding with verification
- CRUD operations for products (create, update, delete, list)
- Product categories and filtering
- Vendor-specific product listings

### 3. **Cart & Order Processing**
- Add/remove items from the cart
- Real-time cart sync using Firestore
- Secure checkout with payment integration (Razorpay/Stripe)
- Order status tracking (Pending, Processing, Delivered)

### 4. **User Orders & History**
- View past orders with invoice details
- Reorder previous purchases
- Real-time order status updates via Firebase Cloud Messaging (FCM)

### 5. **Search & Recommendation**
- Full-text search for products & vendors
- AI-based recommendation system (future integration)

### 6. **Admin & Analytics**
- Role-based access for users and vendors
- Sales analytics and vendor performance tracking
- Order reports and revenue insights

## API Endpoints
### **Authentication**
- `POST /api/auth/register` - User/vendor registration
- `POST /api/auth/login` - User/vendor login
- `POST /api/auth/logout` - User/vendor logout

### **Products & Vendors**
- `GET /api/vendors` - List all vendors
- `GET /api/vendors/:id` - Get vendor details
- `POST /api/products` - Add new product (vendor only)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `PUT /api/products/:id` - Update product details (vendor only)
- `DELETE /api/products/:id` - Remove product (vendor only)

### **Cart & Orders**
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `POST /api/orders/create` - Place an order
- `GET /api/orders` - View user order history
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin/vendor)

## Installation & Setup
### **Prerequisites**
- Node.js installed (`>= v18`)
- Firebase project set up

### **Installation Steps**
```bash
# Clone the repository
git clone https://github.com/your-repo/multi-vendor-grocery-backend.git
cd multi-vendor-grocery-backend

# Install dependencies
npm install

# Set up Firebase config (in .env file)
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id

# Start the server
npm run dev
```

## Deployment
- **Local:** `npm start`
- **Firebase Functions Deployment:** `firebase deploy`
- **Hosting (Vercel/Render/Cloud Run)**: Set up continuous deployment

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## License
MIT License

---
This backend is designed to be scalable and optimized for real-time grocery shopping experiences. 🚀

