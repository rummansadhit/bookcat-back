import mongoose, { Document, Schema } from 'mongoose';


export interface IReview extends Document {
  
  userName: string;
  comment: string;
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  guid: string;
  reviews: IReview[];


}


const reviewSchema = new Schema<IReview>({
  
  userName: { type: String, required: true },
  comment: { type: String, required: true },
});





const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  guid: { type: String, required: false, unique: true },
  reviews: [reviewSchema],
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
