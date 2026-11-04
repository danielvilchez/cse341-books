import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    authorHasBooks,
} from '../models/authors.js';

const getAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error('GET /authors failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const author = await getAuthorById(requestedId);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error('GET /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const createAuthorHandler = async (req, res) => {
    const { id, name, birthYear } = req.body;

    if (
        typeof id !== 'string' ||
        !id.trim() ||
        typeof name !== 'string' ||
        !name.trim() ||
        !Number.isInteger(birthYear)
    ) {
        return res.status(400).json({
            message: 'Invalid or missing author fields',
        });
    }

    try {
        const existingAuthor = await getAuthorById(id);

        if (existingAuthor) {
            return res.status(400).json({
                message: 'Author ID already exists',
            });
        }

        await createAuthor({ id, name: name.trim(), birthYear });

        return res.status(201).json({
            id,
            name: name.trim(),
            birthYear,
        });
    } catch (error) {
        console.error('POST /authors failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateAuthorHandler = async (req, res) => {
    const requestedId = req.params.id;
    const { name, birthYear } = req.body;

    if (
        typeof name !== 'string' ||
        !name.trim() ||
        !Number.isInteger(birthYear)
    ) {
        return res.status(400).json({
            message: 'Invalid or missing author fields',
        });
    }

    try {
        const existingAuthor = await getAuthorById(requestedId);

        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        await updateAuthor(requestedId, {
            name: name.trim(),
            birthYear,
        });

        return res.status(200).json({
            id: requestedId,
            name: name.trim(),
            birthYear,
        });
    } catch (error) {
        console.error('PUT /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAuthorHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const existingAuthor = await getAuthorById(requestedId);

        if (!existingAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const hasBooks = await authorHasBooks(requestedId);

        if (hasBooks) {
            return res.status(409).json({
                message: 'Author cannot be deleted because they still have books',
            });
        }

        await deleteAuthor(requestedId);

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /authors/:id failed:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getAuthorsHandler,
    getAuthorByIdHandler,
    createAuthorHandler,
    updateAuthorHandler,
    deleteAuthorHandler,
};
