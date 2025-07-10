import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  itemId: { type: String, required: true }, // event or merch id
  type: { type: String, enum: ['event', 'merch'], required: true },
  userId: { type: String, required: true },
  userName: { type: String }, // for display
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  upvotes: { type: [String], default: [] }, // userIds
  downvotes: { type: [String], default: [] }, // userIds
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
