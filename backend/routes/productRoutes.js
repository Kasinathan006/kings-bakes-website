import express from 'express';
import multer from 'multer';
import path from 'path';
import Product from '../models/Product.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination(req, file, cb) { cb(null, 'uploads/'); },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) { checkFileType(file, cb); }
});

// @route   GET /api/v1/products
router.get('/', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 12 } = req.query;
        let query = {};
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };

        const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Product.countDocuments(query);

        res.json({
            success: true,
            data: products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            count
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   GET /api/v1/products/featured
router.get('/featured', async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true, isAvailable: true }).limit(6);
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   GET /api/v1/products/category/:category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   GET /api/v1/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   POST /api/v1/products
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, category, isVeg, isAvailable, isFeatured } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '/uploads/default.jpg';

        const product = await Product.create({
            name, price, description, category,
            image: imagePath,
            isVeg, isAvailable, isFeatured
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   PUT /api/v1/products/:id
router.put('/:id', protect, upload.single('image'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// @route   DELETE /api/v1/products/:id
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        await product.deleteOne();
        res.json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// @route   PATCH /api/v1/products/:id/availability
router.patch('/:id/availability', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, error: 'Product not found' });

        product.isAvailable = typeof req.body.isAvailable !== 'undefined' ? req.body.isAvailable : !product.isAvailable;
        await product.save();
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

export default router;
