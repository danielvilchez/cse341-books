import express from 'express';
import router from './src/router.js';

const app = express();

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

// Handle routes that do not exist
app.use((req, res) => {
    return res.status(404).json({ message: 'Route not found' });
});

// Handle unexpected errors
app.use((err, req, res, next) => {
    console.error('Unexpected server error:', err.message);
    return res.status(500).json({ message: 'Internal server error' });
});

export default app;
