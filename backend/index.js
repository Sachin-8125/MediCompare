import express from 'express';

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//api routes
app.use('/api/auth', authRoutes);
