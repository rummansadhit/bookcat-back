import express, { Request, Response, Application } from 'express';
import mongoose, { Document } from 'mongoose';
import bodyParser from 'body-parser';
import Book, { IBook } from './model/book';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
// Set up middleware
app.use(bodyParser.json());

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const mongodb = process.env.MONGOURL || 'mongodb://localhost:27017/books';



// Connect to MongoDB
mongoose.connect(mongodb)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.post('/books', (req: Request, res: Response) => {
    const book: IBook = new Book(req.body);
    book.save()
      .then((result: IBook) => {
        res.json(result);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: 'Error creating book' });
      });
  });
  
  // Read all books
  app.get('/books', (req: Request, res: Response) => {
    Book.find()
      .then((books: IBook[]) => {
        res.json(books);
      })
      .catch((error: Error) => {
        res.status(500).json({ error: 'Error retrieving books' });
      });
  });
  
  // Read a single book
  app.get('/books/:id', (req: Request, res: Response) => {
    Book.findById(req.params.id)
      .then((book: IBook | null) => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: 'Error retrieving book' });
      });
  });
  
  // Update a book
  app.patch('/books/:guid', (req: Request, res: Response) => {

    console.log(req.body.reviews );
    Book.findOneAndUpdate({ guid: req.params.guid }, { $set: { reviews: req.body.reviews } }, { new: true })
      .then((book: IBook | null) => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: 'Error updating book' });
      });
  });
  // Delete a book
  app.delete('/books/:id', (req: Request, res: Response) => {
    Book.findByIdAndDelete(req.params.id)
      .then((book: IBook | null) => {
        if (book) {
          res.json(book);
        } else {
          res.status(404).json({ error: 'Book not found' });
        }
      })
      .catch((error: Error) => {
        res.status(500).json({ error: 'Error deleting book' });
      });
  });









  