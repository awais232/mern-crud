const BookModel = require("../models/Book");

const bookController = {
  getAllBooks: (req, res) => {
    BookModel.find()
      .then((books) => res.json(books))
      .catch((err) => res.json(err));
  },

  createBook: (req, res) => {
    BookModel.create(req.body)
      .then((books) => res.json(books))
      .catch((err) => res.json(err));
  },

  getBookById: (req, res) => {
    const { id } = req.params;
    BookModel.findById({ _id: id })
      .then((books) => res.json(books))
      .catch((err) => res.json(err));
  },

  updateBook: (req, res) => {
    const { id } = req.params;
    BookModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
      .then((books) => res.json(books))
      .catch((err) => res.json(err));
  },

  deleteBook: (req, res) => {
    const { id } = req.params;
    BookModel.findByIdAndDelete({ _id: id })
      .then(() => {
        return BookModel.find();
      })
      .then((books) => res.json(books))
      .catch((err) => res.json(err));
  },
};

module.exports = bookController;
