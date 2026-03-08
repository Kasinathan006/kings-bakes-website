import express from 'express';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/v1/contact
router.post('/', async (req, res) => {
    const { name, phone, email, message } = req.body;
    try {
        const contact = await Contact.create({
            name,
            phone,
            email,
            message,
        });
        res.status(201).json({ success: true, data: contact });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, error: messages });
        }
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   GET /api/v1/contact
router.get('/', protect, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   PATCH /api/v1/contact/:id/read
router.patch('/:id/read', protect, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!contact) return res.status(404).json({ success: false, error: 'Contact not found' });
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   DELETE /api/v1/contact/:id
router.delete('/:id', protect, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        await contact.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
