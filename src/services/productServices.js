import api from "./api";

const API_URL = "/products";

export const getProducts = async () => {
  const { data } = await api.get(API_URL);
  return data.data; 
};