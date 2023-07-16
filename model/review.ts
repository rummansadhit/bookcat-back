import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  bookId: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  bookId: { type: String, ref: 'Book', required: true },
  username: { type: String, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;