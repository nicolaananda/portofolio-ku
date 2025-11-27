const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        const posts = await Blog.find(query).sort({ createdAt: -1 });
        res.json({ status: 'success', data: posts });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            // Try finding by slug if ID fails (optional, but good for UX)
            const postBySlug = await Blog.findOne({ slug: req.params.id });
            if (!postBySlug) {
                return res.status(404).json({ status: 'error', message: 'Post not found' });
            }
            return res.json({ status: 'success', data: postBySlug });
        }
        res.json({ status: 'success', data: post });
    } catch (err) {
        // If ID is invalid, try slug
        try {
            const postBySlug = await Blog.findOne({ slug: req.params.id });
            if (!postBySlug) {
                return res.status(404).json({ status: 'error', message: 'Post not found' });
            }
            return res.json({ status: 'success', data: postBySlug });
        } catch (slugErr) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }
});

// POST new post
router.post('/', async (req, res) => {
    const post = new Blog({
        title: req.body.title,
        excerpt: req.body.excerpt,
        content: req.body.content,
        coverImage: req.body.coverImage,
        category: req.body.category,
        featured: req.body.featured,
        author: req.body.author || {
            name: "Nicola Ananda",
            avatar: "/profile.webp",
            bio: "Data Analyst and Web Developer"
        }
    });

    try {
        const newPost = await post.save();
        res.status(201).json({ status: 'success', data: newPost });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// UPDATE post
router.put('/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });

        if (req.body.title) post.title = req.body.title;
        if (req.body.excerpt) post.excerpt = req.body.excerpt;
        if (req.body.content) post.content = req.body.content;
        if (req.body.coverImage) post.coverImage = req.body.coverImage;
        if (req.body.category) post.category = req.body.category;
        if (req.body.featured !== undefined) post.featured = req.body.featured;

        const updatedPost = await post.save();
        res.json({ status: 'success', data: updatedPost });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.status(404).json({ status: 'error', message: 'Post not found' });

        await post.deleteOne();
        res.json({ status: 'success', message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
