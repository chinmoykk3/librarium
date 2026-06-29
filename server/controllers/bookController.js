const db = require("../config/db");

// =======================
// ADD BOOK
// =======================
exports.addBook = (req, res) => {
  const {
    title,
    author,
    category,
    isbn,
    quantity,
    available,
    published_year,
  } = req.body;

  const sql = `
    INSERT INTO books
    (title,author,category,isbn,quantity,available,published_year)
    VALUES(?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      title,
      author,
      category,
      isbn,
      quantity,
      available,
      published_year,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book Added Successfully",
      });
    }
  );
};

// =======================
// GET ALL BOOKS
// =======================
exports.getBooks = (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// =======================
// GET SINGLE BOOK
// =======================
exports.getBook = (req, res) => {
  db.query(
    "SELECT * FROM books WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

// =======================
// UPDATE BOOK
// =======================
exports.updateBook = (req, res) => {
  const {
    title,
    author,
    category,
    isbn,
    quantity,
    available,
    published_year,
  } = req.body;

  db.query(
    `UPDATE books
     SET title=?,
         author=?,
         category=?,
         isbn=?,
         quantity=?,
         available=?,
         published_year=?
     WHERE id=?`,
    [
      title,
      author,
      category,
      isbn,
      quantity,
      available,
      published_year,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book Updated Successfully",
      });
    }
  );
};

// =======================
// DELETE BOOK
// =======================
exports.deleteBook = (req, res) => {
  db.query(
    "DELETE FROM books WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Book Deleted Successfully",
      });
    }
  );
};