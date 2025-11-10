import api from "./api";

// Fetch all categories with their subcategories
export const fetchCategories = async () => {
  const res = await api.get("/categories");
  return res.data.data; 
};

// === Category CRUD ===

export const createCategory = async (categoryData) => {
  const { data } = await api.post('/categories', categoryData);
  return data;
};

export const updateCategory = async ({ id, categoryData }) => {
  const { data } = await api.put(`/categories/${id}`, categoryData);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};

// === Subcategory CRUD ===

export const createSubcategory = async ({ categoryId, subcategoryData }) => {
  const { data } = await api.post(`/categories/${categoryId}/subcategories`, subcategoryData);
  return data;
};

export const updateSubcategory = async ({ categoryId, subcategoryId, subcategoryData }) => {
  const { data } = await api.put(`/categories/${categoryId}/subcategories/${subcategoryId}`, subcategoryData);
  return data;
};

export const deleteSubcategory = async ({ categoryId, subcategoryId }) => {
  const { data } = await api.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
  return data;
};