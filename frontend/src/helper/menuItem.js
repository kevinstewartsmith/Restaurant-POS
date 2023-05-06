import axios from "axios";
import { getToken } from "./user";

const API_URL = "/api/items/";

export const createMenuItem = async (restaurantData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.post(API_URL, restaurantData, config);

  return response.data;
};

export const getMenuItems = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const deleteMenuItem = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
