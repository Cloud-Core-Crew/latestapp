import express from 'express';
import { getReviews, addReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', authMiddleware, addReview);

export default router;
