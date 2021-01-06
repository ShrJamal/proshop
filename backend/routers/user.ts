import express from 'express';
import { loginUser, userProfile } from '../controllers/user';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// @desc    Auth user and get token
// @route   GET /api/login
// @access  Public
router.post('/login', loginUser);

// @desc    fetch user profile info
// @route   GET /api/login
// @access  Public
router.get('/profile', authMiddleware, userProfile);

export default router;
