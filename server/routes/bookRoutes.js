const express = require("express");

const router = express.Router();

const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/", addBook);

router.get("/", getBooks);

router.get("/:id", getBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;