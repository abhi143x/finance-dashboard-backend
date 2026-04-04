const Record = require('../models/Record');

// @desc    Get dashboard summary statistics
// @route   GET /api/dashboard/summary
// @access  Private (Admin, Analyst, Viewer)
exports.getDashboardSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotalsMap = {};

    records.forEach((record) => {
      if (record.type === 'income') {
        totalIncome += record.amount;
      } else if (record.type === 'expense') {
        totalExpense += record.amount;
      }

      // Category map
      const key = `${record.type}_${record.category}`;
      if (!categoryTotalsMap[key]) {
        categoryTotalsMap[key] = {
          type: record.type,
          category: record.category,
          totalAmount: 0
        };
      }
      categoryTotalsMap[key].totalAmount += record.amount;
    });

    const netBalance = totalIncome - totalExpense;

    const summary = {
      totalIncome,
      totalExpense,
      netBalance,
      categoryTotals: Object.values(categoryTotalsMap).sort((a, b) => b.totalAmount - a.totalAmount)
    };

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
