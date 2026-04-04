const express = require('express');
const {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordController');

const { protect, requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply protect middleware to all record routes
router.use(protect);

router.get('/', requireRole('Admin', 'Analyst'), getRecords);
router.post('/', requireRole('Admin', 'Analyst'), createRecord);

router.get('/:id', requireRole('Admin', 'Analyst'), getRecord);
router.put('/:id', requireRole('Admin'), updateRecord);
router.delete('/:id', requireRole('Admin'), deleteRecord);

module.exports = router;
