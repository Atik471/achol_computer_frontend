import api from "./api";

const API_URL = "/products";

// Get and filter all products
export const getProducts = async (params = {}) => {
  const { data } = await api.get(API_URL, { params });
  return data; 
};

// Get single product by slug
export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/slug/${slug}`);
  return data.data; // returning only product object
};