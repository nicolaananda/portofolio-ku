const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }
        if (featured === 'true') {
            query.featured = true;
        }

        const projects = await Portfolio.find(query).sort({ createdAt: -1 });
        res.json({ status: 'success', data: projects });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// GET single project
router.get('/:id', async (req, res) => {
    try {
        const project = await Portfolio.findById(req.params.id);
        if (!project) {
            // Try finding by slug
            const projectBySlug = await Portfolio.findOne({ slug: req.params.id });
            if (!projectBySlug) {
                return res.status(404).json({ status: 'error', message: 'Project not found' });
            }
            return res.json({ status: 'success', data: projectBySlug });
        }
        res.json({ status: 'success', data: project });
    } catch (err) {
        try {
            const projectBySlug = await Portfolio.findOne({ slug: req.params.id });
            if (!projectBySlug) {
                return res.status(404).json({ status: 'error', message: 'Project not found' });
            }
            return res.json({ status: 'success', data: projectBySlug });
        } catch (slugErr) {
            res.status(500).json({ status: 'error', message: err.message });
        }
    }
});

// POST new project
router.post('/', async (req, res) => {
    const project = new Portfolio(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json({ status: 'success', data: newProject });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// UPDATE project
router.put('/:id', async (req, res) => {
    try {
        const project = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ status: 'error', message: 'Project not found' });
        res.json({ status: 'success', data: project });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// DELETE project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Portfolio.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ status: 'error', message: 'Project not found' });
        res.json({ status: 'success', message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
