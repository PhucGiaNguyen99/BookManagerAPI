import express, {Request, Response} from 'express';
import { validate} from 'class-validator';
import { Book } from './models/Book';

const app = express();
app.use(express.json());

let books: Book[] = [];

app.post('/books', async (req: Request, res: Response) => {
    const { title, author, publishedDate, isbn, pages } = req.body;
    const book = new Book(title, author, publishedDate, isbn, pages);

    const errors = await validate(book);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    books.push(book);
    res.status(201).json(book);
});

app.get('/books', (req: Request, res: Response) => {
    res.json(books);
});

app.get('/books/:id', (req: Request, res: Response) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(400).json({message: 'Book not found' });
    }
    res.json(book);
});

app.put('/books/:id', async (req: Request, res: Response) => {
    const { title, author, publishedDate, isbn, pages } = req.body;
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
        return res.status(404).json({message: 'Book not found'});
    }

    const book = new Book(title, author, publishedDate, isbn, pages);
    book.id = req.params.id;

    const errors = await validate(book);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }

    books[bookIndex] = book;
    res.json(book); 
});

app.delete('/books/:id', (req: Request, res: Response) => {
    books = books.filter(b => b.id !== req.params.id);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});