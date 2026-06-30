const express = require("express");

const router = express.Router();

const {
  getStats,
} = require("../controllers/dashboardController");

// GET Dashboard Statistics
router.get("/", getStats);

module.exports = router;