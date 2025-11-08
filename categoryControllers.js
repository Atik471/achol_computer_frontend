import Category from '../models/Category.js';
import asyncHandler from '../middlewares/asyncHandler.js';

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  });
});