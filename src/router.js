import express from 'express';
import {
    getBooksHandler,
    getBookByIdHandler,
} from './controllers/books.js';
import {
    getAuthorsHandler,
    getAuthorByIdHandler,
    createAuthorHandler,
    updateAuthorHandler,
    deleteAuthorHandler,
} from './controllers/authors.js';

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

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Retrieves a list of all authors.
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors', getAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Retrieves a single author using their ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author.
 *     responses:
 *       200:
 *         description: Author retrieved successfully.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author in the database.
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Gabriel Garcia
 *               birthYear:
 *                 type: integer
 *                 example: 1967
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       400:
 *         description: Invalid or missing author fields, or duplicate ID.
 *       500:
 *         description: Internal server error.
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Updates an existing author using their ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gabriel Garcia Marquez
 *               birthYear:
 *                 type: integer
 *                 example: 1967
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       400:
 *         description: Invalid or missing author fields.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author if they do not have associated books.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author.
 *     responses:
 *       204:
 *         description: Author deleted successfully.
 *       404:
 *         description: Author not found.
 *       409:
 *         description: Cannot delete an author with associated books.
 *       500:
 *         description: Internal server error.
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;
