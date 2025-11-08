import Subcategory from '../models/Subcategory.js';
import asyncHandler from '../middlewares/asyncHandler.js';

/**
 * @desc    Get all subcategories
 * @route   GET /api/subcategories
 * @access  Public
 */
export const getSubcategories = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.category) {
    query.category = req.query.category;
  }

  const subcategories = await Subcategory.find(query);

  res.status(200).json({
    success: true,
    count: subcategories.length,
    data: subcategories,
  });
});