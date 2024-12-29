import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
});

const NEWS = mongoose.model('NEWS', newsSchema);

export default NEWS;