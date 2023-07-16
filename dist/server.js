"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_1 = __importDefault(require("./model/book"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Set up middleware
app.use(body_parser_1.default.json());
// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
const mongodb = process.env.MONGOURL || 'mongodb://localhost:27017/books';
// Connect to MongoDB
mongoose_1.default.connect(mongodb)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.post('/books', (req, res) => {
    const book = new book_1.default(req.body);
    console.log(req.body);
    book.save()
        .then((result) => {
        res.json(result);
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error creating book' });
    });
});
// Read all books
app.get('/books', (req, res) => {
    book_1.default.find()
        .then((books) => {
        res.json(books);
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error retrieving books' });
    });
});
// Read a single book
app.get('/books/:id', (req, res) => {
    book_1.default.findById(req.params.id)
        .then((book) => {
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error retrieving book' });
    });
});
// Update a book
app.patch('/books/:guid', (req, res) => {
    console.log(req.body.reviews);
    book_1.default.findOneAndUpdate({ guid: req.params.guid }, { $set: { reviews: req.body.reviews } }, { new: true })
        .then((book) => {
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error updating book' });
    });
});
app.delete('/books/:guid', (req, res) => {
    console.log(req.params.guid);
    book_1.default.findOneAndDelete({ guid: req.params.guid })
        .then((book) => {
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error deleting book' });
    });
});
app.patch('/books/edit/:guid', (req, res) => {
    console.log("edit");
    book_1.default.findOneAndUpdate({ guid: req.params.guid }, { $set: Object.assign({}, req.body) }, { new: true })
        .then((book) => {
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    })
        .catch((error) => {
        res.status(500).json({ error: 'Error updating book' });
    });
});
// Delete a book
