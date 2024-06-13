const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;
        const author = req.session.user.user_id;

        const [result] = await db.query(
            'INSERT INTO posts (user_id, category_id, title, content) VALUES (?, ?, ?, ?)',
            [author, 1, title, body]
        );

        const newPost = { post_id: result.insertId, title, body, author };
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(201).json(newPost);
    } catch (err) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [posts] = await db.query(
            'SELECT p.*, u.username AS author FROM posts p JOIN users u ON p.user_id = u.user_id'
        );
        res.json(posts);
    } catch (err) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [posts] = await db.query(
            'SELECT p.*, u.username AS author FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = ?',
            [req.params.id]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.json(posts[0]);
    } catch (err) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;
        const [posts] = await db.query('SELECT * FROM posts WHERE post_id = ?', [req.params.id]);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = posts[0];
        if (post.user_id !== req.session.user.user_id) {
            return res.status(403).json({ message: 'Forbidden: You can only edit your own posts' });
        }

        await db.query(
            'UPDATE posts SET title = ?, content = ? WHERE post_id = ?',
            [title || post.title, body || post.content, req.params.id]
        );

        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.json({ post_id: req.params.id, title, body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const [posts] = await db.query('SELECT * FROM posts WHERE post_id = ?', [req.params.id]);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = posts[0];
        if (post.user_id !== req.session.user.user_id) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own posts' });
        }

        await db.query('DELETE FROM posts WHERE post_id = ?', [req.params.id]);

        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

