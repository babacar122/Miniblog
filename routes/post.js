const express = require('express');
const router = express.Router();
const db = require('./db');
const authMiddleware = require('../middlewares/auth');

router.post('/new', authMiddleware, async (req, res) => {
    try {
        const { title, body } = req.body;
        const author = req.session.user.user_id;

        const [result] = await db.query(
            'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
            [author, 1, title, body]
        );
        console.log("Added the post: " + result);
        const newPost = { post_id: result.insertId, title, body, author };
        res.status(201).json(newPost);
    } catch (err) {
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
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);
        
        const [posts] = await db.query(
            'SELECT p.*, u.username AS author FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = ?',
            [postId]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log("Post found:", posts[0]);
        res.json(posts[0]);
    } catch (err) {
        console.error('Internal Server Error:', err);
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

        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

