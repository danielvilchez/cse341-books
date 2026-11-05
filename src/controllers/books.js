import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    authorExists,
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createBookHandler = async (req, res) => {
    const { id, authorId, title, publicationDate } = req.body;

    if (
        typeof id !== 'string' ||
        !id.trim() ||
        typeof authorId !== 'string' ||
        !authorId.trim() ||
        typeof title !== 'string' ||
        !title.trim() ||
        typeof publicationDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)
    ) {
        return res.status(400).json({
            message: 'Invalid or missing book fields',
        });
    }

    try {
        const existingBook = await getBookById(id);

        if (existingBook) {
            return res.status(400).json({
                message: 'Book ID already exists',
            });
        }

        const existingAuthor = await authorExists(authorId);

        if (!existingAuthor) {
            return res.status(400).json({
                message: 'Author does not exist',
            });
        }

        await createBook({
            id,
            authorId,
            title: title.trim(),
            publicationDate,
        });

        return res.status(201).json({
            id,
            authorId,
            title: title.trim(),
            publicationDate,
        });
    } catch (error) {
        console.error('POST /books failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBookHandler = async (req, res) => {
    const requestedId = req.params.id;
    const { authorId, title, publicationDate } = req.body;

    if (
        typeof authorId !== 'string' ||
        !authorId.trim() ||
        typeof title !== 'string' ||
        !title.trim() ||
        typeof publicationDate !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)
    ) {
        return res.status(400).json({
            message: 'Invalid or missing book fields',
        });
    }

    try {
        const existingBook = await getBookById(requestedId);

        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const existingAuthor = await authorExists(authorId);

        if (!existingAuthor) {
            return res.status(400).json({
                message: 'Author does not exist',
            });
        }

        await updateBook(requestedId, {
            authorId,
            title: title.trim(),
            publicationDate,
        });

        return res.status(200).json({
            id: requestedId,
            authorId,
            title: title.trim(),
            publicationDate,
        });
    } catch (error) {
        console.error('PUT /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const existingBook = await getBookById(requestedId);

        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await deleteBook(requestedId);

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler,
};
