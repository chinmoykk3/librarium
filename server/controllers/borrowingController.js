const db = require("../config/db");

// =======================
// ISSUE BOOK
// =======================
exports.issueBook = (req, res) => {
  console.log("========== NEW REQUEST ==========");
  console.log("BODY:", req.body);

  const { member_id, book_id, issue_date, due_date } = req.body;

  console.log("Member ID:", member_id);
  console.log("Book ID:", book_id);
  console.log("Issue Date:", issue_date);
  console.log("Due Date:", due_date);

  db.query(
    "SELECT available FROM books WHERE id=?",
    [book_id],
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

      if (result[0].available <= 0) {
        return res.status(400).json({
          message: "Book Out of Stock",
        });
      }

      const sql = `
      INSERT INTO borrowings
      (member_id, book_id, issue_date, due_date)
      VALUES (?, ?, ?, ?)
      `;

      console.log("Executing Query...");
      console.log(sql);
      console.log([
        member_id,
        book_id,
        issue_date,
        due_date,
      ]);

      db.query(
        sql,
        [
          member_id,
          book_id,
          issue_date,
          due_date,
        ],
        (err) => {
          if (err) {
            console.log("INSERT ERROR");
            console.log(err);
            return res.status(500).json(err);
          }

          db.query(
            "UPDATE books SET available = available - 1 WHERE id=?",
            [book_id],
            (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json(err);
              }

              res.json({
                message: "Book Issued Successfully",
              });
            }
          );
        }
      );
    }
  );
};

// =======================
// GET ALL BORROWINGS
// =======================
exports.getBorrowings = (req, res) => {
  const sql = `
    SELECT
      borrowings.*,
      members.full_name,
      books.title
    FROM borrowings
    JOIN members
      ON borrowings.member_id = members.id
    JOIN books
      ON borrowings.book_id = books.id
    ORDER BY borrowings.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

// =======================
// RETURN BOOK
// =======================
exports.returnBook = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM borrowings WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Borrow Record Not Found",
        });
      }

      const borrow = result[0];

      db.query(
        `UPDATE borrowings
         SET status='Returned',
             return_date=CURDATE()
         WHERE id=?`,
        [id],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }

          db.query(
            "UPDATE books SET available = available + 1 WHERE id=?",
            [borrow.book_id],
            (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json(err);
              }

              res.json({
                message: "Book Returned Successfully",
              });
            }
          );
        }
      );
    }
  );
};

// =======================
// DELETE BORROW RECORD
// =======================
exports.deleteBorrowing = (req, res) => {
  db.query(
    "DELETE FROM borrowings WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Borrow Record Deleted",
      });
    }
  );
};