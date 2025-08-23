import api from "./api";

const API_URL = "/products";

export const getProducts = async (params = {}) => {
  const { data } = await api.get(API_URL, { params });
  return data; 
};