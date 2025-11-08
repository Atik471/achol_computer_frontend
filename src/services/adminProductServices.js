import api from "./api"; // Assuming your api instance is exported from here

export { api };

export const getAdminProducts = async (params) => {
  const { data } = await api.get('/admin/products', { params });
  return data;
};

export const createAdminProduct = async (productData) => {
  const { data } = await api.post('/admin/products', productData);
  return data;
};

export const updateAdminProduct = async ({ id, productData }) => {
  const { data } = await api.put(`/admin/products/${id}`, productData);
  return data;
};

export const updateAdminProductStock = async (id, stockData) => {
  const { data } = await api.patch(`/admin/products/${id}/stock`, stockData);
  return data;
};

export const deleteAdminProduct = async (id) => {
  const { data } = await api.delete(`/admin/products/${id}`);
  return data;
};

export const toggleAdminProductStatus = async (id) => {
  const { data } = await api.patch(`/admin/products/${id}/status`);
  return data;
};

export const getProductById = async (id) => {
  // Use the admin endpoint to get the product for editing
  try {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Re-throw the error so react-query can handle it
  }
};