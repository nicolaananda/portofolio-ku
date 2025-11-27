const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all messages (for admin)
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ status: 'success', data: messages });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// POST new message
router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        const newMessage = await contact.save();
        res.status(201).json({ status: 'success', data: newMessage, message: 'Message sent successfully' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

// UPDATE message status
router.put('/:id', async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!message) return res.status(404).json({ status: 'error', message: 'Message not found' });
        res.json({ status: 'success', data: message });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
});

module.exports = router;
