import Review from '../models/review.js';

// Fetch reviews with sorting/filtering
export const getReviews = async (req, res) => {
  try {
    const { itemId, type, sort = 'newest', minRating = 0, userId } = req.query;
    const filter = { itemId, type };
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (userId) filter.userId = userId;
    let query = Review.find(filter);
    switch (sort) {
      case 'oldest': query = query.sort({ createdAt: 1 }); break;
      case 'highest': query = query.sort({ rating: -1 }); break;
      case 'lowest': query = query.sort({ rating: 1 }); break;
      case 'mostUpvoted': query = query.sort({ upvotes: -1 }); break;
      default: query = query.sort({ createdAt: -1 });
    }
    const reviews = await query.exec();
    res.json(reviews.map(r => ({
      ...r.toObject(),
      upvotes: r.upvotes.length,
      downvotes: r.downvotes.length
    })));
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { itemId, type, rating, comment } = req.body;
    const userId = req.user.id || req.user._id;
    const userName = req.user.name || req.user.email || 'User';
    // Only one review per user per item
    const existing = await Review.findOne({ itemId, type, userId });
    if (existing) return res.status(400).json({ message: 'You already reviewed this item.' });
    const review = new Review({ itemId, type, rating, comment, userId, userName });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review' });
  }
};

// Edit a review
export const editReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== (req.user.id || req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    review.rating = rating;
    review.comment = comment;
    review.updatedAt = Date.now();
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit review' });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== (req.user.id || req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review' });
  }
};

// Upvote a review
export const upvoteReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (!review.upvotes.includes(userId)) review.upvotes.push(userId);
    review.downvotes = review.downvotes.filter(id => id !== userId);
    await review.save();
    res.json({ upvotes: review.upvotes.length, downvotes: review.downvotes.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upvote' });
  }
};

// Downvote a review
export const downvoteReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (!review.downvotes.includes(userId)) review.downvotes.push(userId);
    review.upvotes = review.upvotes.filter(id => id !== userId);
    await review.save();
    res.json({ upvotes: review.upvotes.length, downvotes: review.downvotes.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to downvote' });
  }
};
