"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
// @desc    Auth user and get token
// @route   POST /api/login
// @access  Public
router.post('/login', user_1.loginUser);
// @desc    Signup user
// @route   POST /api/signup
// @access  Public
router.post('/signup', user_1.signup);
// @desc    Fetch or update user profile info
// @route   GET-PUT /api/profile
// @access  Private
router
    .route('/profile')
    .get(auth_1.authMiddleware, user_1.userProfile)
    .put(auth_1.authMiddleware, user_1.updateProfile);
exports.default = router;
