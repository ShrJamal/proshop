import express from 'express';
import { loginUser, signup, userProfile } from '../controllers/user';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// @desc    Auth user and get token
// @route   POST /api/login
// @access  Public
router.post('/login', loginUser);

// @desc    Signup user
// @route   POST /api/signup
// @access  Public
router.post('/signup', signup);

// @desc    Fetch user profile info
// @route   GET /api/profile
// @access  Private
router.get('/profile', authMiddleware, userProfile);

export default router;
