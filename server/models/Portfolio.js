const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    gallery: [String],
    technologies: [String],
    link: String,
    github: String,
    challenge: String,
    solution: String,
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Pre-save hook to generate slug
portfolioSchema.pre('save', function (next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
