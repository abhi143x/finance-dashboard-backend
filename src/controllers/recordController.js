const Record = require('../models/Record');

// @desc    Create a new record
// @route   POST /api/records
// @access  Private (Admin, Analyst)
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: 'Amount, type, and category are required' });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date: date || Date.now(),
      notes,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all records
// @route   GET /api/records
// @access  Private (Admin, Analyst)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const records = await Record.find(filter).populate('createdBy', 'name email').sort('-date');

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single record
// @route   GET /api/records/:id
// @access  Private (Admin, Analyst)
exports.getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate('createdBy', 'name email');

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private (Admin)
exports.updateRecord = async (req, res) => {
  try {
    let record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private (Admin)
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    await record.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
