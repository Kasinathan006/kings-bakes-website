import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// @route   POST /api/v1/admin/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/v1/admin/verify
router.get('/verify', protect, async (req, res) => {
    res.json({ message: 'Token is valid', admin: req.admin });
});

// @route   POST /api/v1/admin/change-password
router.post('/change-password', protect, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(newPassword, salt);
        await admin.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Initial Setup (Uncomment to create first admin, then comment out)
// router.post('/setup', async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const password = await bcrypt.hash('kingsbakes123', salt);
//     const admin = await Admin.create({ username: 'admin', password });
//     res.json(admin);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
