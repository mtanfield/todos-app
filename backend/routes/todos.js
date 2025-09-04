import Router from 'express-promise-router';
import db from '../db/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = new Router();

// Get all Todos:
router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM todos ORDER BY id ASC');
    res.json(rows);
});

// Get a single Todo by ID:
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM todos WHERE id = $1', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(rows[0]);
});

// Create a new Todo (UUID is automatically generated):
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }
    const id = uuidv4();
    const { rows } = await db.query(
        'INSERT INTO todos (id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [id, title, description]
    );
    res.status(201).json(rows[0]);
});

// Update an existing Todo by ID:
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const { rows } = await db.query(
        'UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *',
        [title, description, completed, id]
    );
    if (rows.length === 0) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(rows[0]);
});

// Delete a Todo by ID:
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM todos WHERE id = $1', [id]);
    if (rowCount === 0) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
});

export default router;
