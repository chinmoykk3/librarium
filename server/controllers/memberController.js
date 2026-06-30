const db = require("../config/db");

// =======================
// ADD MEMBER
// =======================
exports.addMember = (req, res) => {
  const {
    full_name,
    email,
    phone,
    address,
    membership_type,
    join_date,
  } = req.body;

  const sql = `
    INSERT INTO members
    (full_name,email,phone,address,membership_type,join_date)
    VALUES(?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      full_name,
      email,
      phone,
      address,
      membership_type,
      join_date,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Member Added Successfully",
      });
    }
  );
};

// =======================
// GET ALL MEMBERS
// =======================
exports.getMembers = (req, res) => {
  db.query("SELECT * FROM members", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// =======================
// GET SINGLE MEMBER
// =======================
exports.getMember = (req, res) => {
  db.query(
    "SELECT * FROM members WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

// =======================
// UPDATE MEMBER
// =======================
exports.updateMember = (req, res) => {
  const {
    full_name,
    email,
    phone,
    address,
    membership_type,
    join_date,
  } = req.body;

  db.query(
    `
    UPDATE members
    SET
      full_name=?,
      email=?,
      phone=?,
      address=?,
      membership_type=?,
      join_date=?
    WHERE id=?
    `,
    [
      full_name,
      email,
      phone,
      address,
      membership_type,
      join_date,
      req.params.id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Member Updated Successfully",
      });
    }
  );
};

// =======================
// DELETE MEMBER
// =======================
exports.deleteMember = (req, res) => {
  db.query(
    "DELETE FROM members WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Member Deleted Successfully",
      });
    }
  );
};