import React, { useEffect, useState } from 'react';
import {
  fetchReviews,
  createReview,
  editReview,
  deleteReview,
  upvoteReview,
  downvoteReview
} from '../services/api';

// Simple avatar generator (initials or icon)
function UserAvatar({ name }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';
  return (
    <span style={{
      display: 'inline-block',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#444',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '32px',
      fontWeight: 700,
      marginRight: 8
    }}>{initials}</span>
  );
}

const ReviewSection = ({ itemId, type, user }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [sort, setSort] = useState('newest');
  const [minRating, setMinRating] = useState(0);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchReviews(itemId, type, sort, { minRating });
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line
  }, [itemId, type, sort, minRating]);

  // Validation helpers
  const validateForm = () => {
    if (!comment.trim()) {
      setFormError('Comment is required.');
      return false;
    }
    if (comment.length < 5) {
      setFormError('Comment must be at least 5 characters.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;
    try {
      await createReview({ itemId, type, rating, comment });
      setComment('');
      setRating(5);
      loadReviews();
    } catch (err) {
      setError('Failed to submit review');
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setFormError('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!editComment.trim()) {
      setFormError('Comment is required.');
      return;
    }
    if (editComment.length < 5) {
      setFormError('Comment must be at least 5 characters.');
      return;
    }
    setFormError('');
    try {
      await editReview(editingId, { rating: editRating, comment: editComment });
      setEditingId(null);
      setEditComment('');
      setEditRating(5);
      loadReviews();
    } catch (err) {
      setError('Failed to edit review');
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      loadReviews();
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  const handleUpvote = async (reviewId) => {
    try {
      await upvoteReview(reviewId);
      loadReviews();
    } catch (err) {
      setError('Failed to upvote');
    }
  };

  const handleDownvote = async (reviewId) => {
    try {
      await downvoteReview(reviewId);
      loadReviews();
    } catch (err) {
      setError('Failed to downvote');
    }
  };

  return (
    <div className="review-section" style={{ marginTop: 24 }}>
      <h3>Reviews</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Sort by: </label>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="mostUpvoted">Most Upvoted</option>
        </select>
        <label style={{ marginLeft: 16 }}>Min Rating: </label>
        <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
          {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      {loading ? <p>Loading...</p> : null}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ paddingLeft: 0 }}>
        {reviews.length === 0 && <li>No reviews yet.</li>}
        {reviews.map((r) => (
          <li key={r._id} style={{ marginBottom: 8, listStyle: 'none', borderBottom: '1px solid #333', paddingBottom: 8, display: 'flex', alignItems: 'flex-start' }}>
            <UserAvatar name={r.user?.name || 'User'} />
            <div style={{ flex: 1 }}>
              <strong>{r.user?.name || 'User'}</strong> — <span>Rating: {r.rating}/5</span>
              <span style={{ marginLeft: 8 }}>
                <button onClick={() => handleUpvote(r._id)} title="Upvote" style={{ marginRight: 4, background: 'none', border: 'none', cursor: 'pointer' }}>▲</button>
                {r.upvotes || 0}
                <button onClick={() => handleDownvote(r._id)} title="Downvote" style={{ marginLeft: 4, background: 'none', border: 'none', cursor: 'pointer' }}>▼</button>
                {r.downvotes || 0}
              </span>
              {editingId === r._id ? (
                <form onSubmit={handleEditSubmit} style={{ marginTop: 8 }}>
                  <label>
                    Rating:
                    <select value={editRating} onChange={e => setEditRating(Number(e.target.value))}>
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </label>
                  <br />
                  <label>
                    Comment:
                    <textarea value={editComment} onChange={e => setEditComment(e.target.value)} required rows={2} style={{ width: '100%' }} />
                  </label>
                  {formError && <div style={{ color: 'orange', marginTop: 4 }}>{formError}</div>}
                  <br />
                  <button type="submit" title="Save" style={{ marginRight: 8 }}>💾 Save</button>
                  <button type="button" onClick={() => setEditingId(null)} style={{ marginLeft: 8 }}>Cancel</button>
                </form>
              ) : (
                <>
                  <p style={{ margin: '4px 0' }}>{r.comment}</p>
                  {user && user._id === r.userId && (
                    <>
                      <button onClick={() => handleEdit(r)} title="Edit" style={{ marginRight: 8, background: 'none', border: 'none', cursor: 'pointer' }}>✏️ Edit</button>
                      <button onClick={() => handleDelete(r._id)} title="Delete" style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>🗑️ Delete</button>
                    </>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <label>
            Rating:
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <br />
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              rows={2}
              style={{ width: '100%' }}
              placeholder="Share your experience..."
            />
          </label>
          <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>Min 5 characters. Be respectful and constructive.</div>
          {formError && <div style={{ color: 'orange', marginTop: 4 }}>{formError}</div>}
          <br />
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>Login to add a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
