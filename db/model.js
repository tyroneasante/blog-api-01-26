const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    tags: [String]
})

module.exports = mongoose.model('Blog', BlogSchema)