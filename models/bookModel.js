const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    authors: { type: String, required: true },
    userId: { type: String, required: true },
});

const Book = mongoose.model("book", bookSchema);

module.exports = Book;