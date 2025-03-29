const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const groceryRoutes = require('./routes/groceries');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/orders', orderRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// sample my token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJuWkp1NjEwYkRhS0hVdk95eW8yaSIsImlhdCI6MTczMjg0OTgwNH0.rwhhjZxXNml_yU7POS_cxqQSf_Z4YvLfMFQJnsU3Y88