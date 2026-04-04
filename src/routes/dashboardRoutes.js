const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboardController');
const { protect, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Viewers, Analysts, and Admins can access dashboard summaries
router.get('/summary', protect, requireRole('Admin', 'Analyst', 'Viewer'), getDashboardSummary);

module.exports = router;
