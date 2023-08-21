import express from 'express';
import {register, login, logout, checkAuth, checkEmail} from './authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', checkAuth);
router.get('/check-email', checkEmail);

export default router;
