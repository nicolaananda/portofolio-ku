const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    excerpt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    readTime: {
        type: String,
        default: '5 min read',
    },
    author: {
        name: String,
        avatar: String,
        bio: String,
    },
}, { timestamps: true });

// Pre-save hook to generate slug from title
blogSchema.pre('save', function (next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
