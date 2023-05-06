import axios from "axios";
import { getToken } from "./user";

const API_URL = "/api/tables/";

export const createTable = async (restaurantData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.post(API_URL, restaurantData, config);

  return response.data;
};

export const getTables = async (restaurant) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.get(API_URL + restaurant, config);

  return response.data;
};

export const deleteTable = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
