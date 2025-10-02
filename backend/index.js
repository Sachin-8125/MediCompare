import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import medicineRoutes from './src/routes/medicines.js';
import { seedDatabase } from './src/seed/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

// api routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Prescription Affordability API is running...');
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Seed the database with initial data on server start
  if (process.env.NODE_ENV !== 'production') {
    await seedDatabase();
  }
});