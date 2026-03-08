import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, match: /^[6-9]\d{9}$/ },
    email: { type: String, trim: true },
    message: { type: String, required: true, maxLength: 500 },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
