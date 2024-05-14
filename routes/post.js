const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    const { content, authorId } = req.body;
    const post = await Post.create({ content, authorId });
    res.status(201).send('Post created');
});

router.post('/like', async (req, res) => {
    const { postId, userId } = req.body;
    const post = await Post.findByPk(postId);
    post.likes = [...post.likes, userId];
    await post.save();
    res.send('Post liked');
});

router.post('/comment', async (req, res) => {
    const { postId, userId, content } = req.body;
    const post = await Post.findByPk(postId);
    post.comments = [...post.comments, { user: userId, content }];
    await post.save();
    res.send('Comment added');
});

module.exports = router;