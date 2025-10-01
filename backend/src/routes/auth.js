import express from 'express';
import { registerUser,loginUser,getCurrentUser } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/me',authMiddleware,getCurrentUser);

export default router;