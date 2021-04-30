import express from 'express'
import {
  loginUser,
  signup,
  updateProfile,
  userProfile,
} from '../controllers/user'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

// @desc    Auth user and get token
// @route   POST /api/login
// @access  Public
router.post('/login', loginUser)

// @desc    Signup user
// @route   POST /api/signup
// @access  Public
router.post('/signup', signup)

// @desc    Fetch or update user profile info
// @route   GET-PUT /api/profile
// @access  Private
router
  .route('/profile')
  .get(authMiddleware, userProfile)
  .put(authMiddleware, updateProfile)

export default router
