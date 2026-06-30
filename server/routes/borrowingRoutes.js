const express = require("express");

const router = express.Router();

const {
  issueBook,
  getBorrowings,
  returnBook,
  deleteBorrowing,
} = require("../controllers/borrowingController");

router.post("/", issueBook);

router.get("/", getBorrowings);

router.put("/:id/return", returnBook);

router.delete("/:id", deleteBorrowing);

module.exports = router;