const db = require("../config/db");

// ==============================
// GET DASHBOARD STATISTICS
// ==============================
exports.getStats = (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM books) AS totalBooks,
      (SELECT COUNT(*) FROM members) AS totalMembers,
      (SELECT COUNT(*) FROM borrowings WHERE status='Issued') AS issuedBooks,
      (
        SELECT COUNT(*)
        FROM borrowings
        WHERE status='Issued'
        AND due_date < CURDATE()
      ) AS dueBooks
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};