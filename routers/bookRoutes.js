const router = require("express").Router();
const Book = require("../models/bookModel");
const auth = require("../middleware/auth");

router.post("/save", auth, async (req, res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            link: req.body.link,
            authors: req.body.authors,
            userId: req.body.userId
        });

        const saveBook = await newBook.save();
        res.json(saveBook);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const books = await Book.find({ userId: req.params.id });
        res.json(books);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.delete("/remove/:id", auth, async (req, res) => {
    try {
        const deletedBook = await Book.deleteOne({ _id: req.params.id });
        res.json(deletedBook)
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;