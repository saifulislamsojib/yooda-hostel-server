import express from 'express';
import { distribute, getTodaysDistributions } from '../controllers/distribute.controller';

const router = express.Router();

router.get('/', getTodaysDistributions);

router.post('/', distribute);

export default router;
