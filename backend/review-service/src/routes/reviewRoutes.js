import express from 'express';
import {
  getReviews,
  addReview,
  editReview,
  deleteReview,
  upvoteReview,
  downvoteReview
} from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', authMiddleware, addReview);
router.put('/:id', authMiddleware, editReview);
router.delete('/:id', authMiddleware, deleteReview);
router.post('/:id/upvote', authMiddleware, upvoteReview);
router.post('/:id/downvote', authMiddleware, downvoteReview);

export default router;
