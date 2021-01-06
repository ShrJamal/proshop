import express from 'express';
import { loginUser } from '../controllers/user';

const router = express.Router();

// @desc    Auth use and get token
// @route   GET /api/login
// @access  Public
router.post('/login', loginUser);

export default router;
