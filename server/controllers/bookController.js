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
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

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
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

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
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Book Not Found",
        });
      }

      res.json(result[0]);
    }
  );
};

// =======================
// UPDATE BOOK
// =======================
exports.updateBook = (req, res) => {
  console.log("========== UPDATE API ==========");
  console.log("Book ID:", req.params.id);
  console.log("Body:", req.body);

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
    UPDATE books
    SET
      title=?,
      author=?,
      category=?,
      isbn=?,
      quantity=?,
      available=?,
      published_year=?
    WHERE id=?
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
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      console.log("Affected Rows:", result.affectedRows);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Book Not Found",
        });
      }

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
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Book Not Found",
        });
      }

      res.json({
        message: "Book Deleted Successfully",
      });
    }
  );
};