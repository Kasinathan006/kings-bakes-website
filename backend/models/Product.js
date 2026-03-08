import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxLength: 200 },
    category: { type: String, enum: ['cakes', 'pastries', 'puffs', 'snacks', 'beverages'], required: true },
    image: { type: String, required: true },
    isVeg: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
