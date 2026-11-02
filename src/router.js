
import express from 'express';
import {
    getBooksHandler,
    getBookByIdHandler,
} from './controllers/books.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves a list of all books.
 *     responses:
 *       200:
 *         description: A list of books retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieves a single book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book.
 *     responses:
 *       200:
 *         description: Book retrieved successfully.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/books/:id', getBookByIdHandler);

export default router;
