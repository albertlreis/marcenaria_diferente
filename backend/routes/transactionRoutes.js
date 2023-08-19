import { Router } from 'express';
import * as transactionController from '../controllers/transactionController.js';

const router = Router();

router.get('/show', transactionController.getAllTransactions);

export default router;
