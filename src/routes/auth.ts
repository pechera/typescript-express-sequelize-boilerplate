import { Router } from 'express';

const router: Router = Router();

import AuthController from '../controllers/auth.controller.js';

const auth = new AuthController();

// @route   GET /login
// @desc    Login with email and password route
// @access  Public
router.post('/login', auth.login);

// @route   GET /registration
// @desc    Registration with name, email and password route
// @access  Public
router.post('/registration', auth.register);

// @route   GET /token
// @desc    JWT refresh token verification
// @access  Public
router.post('/token', auth.token);

export default router;
