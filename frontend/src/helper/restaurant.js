import axios from "axios";
import { getToken } from "./user";

const API_URL = "/api/restaurants/";

export const createRestaurant = async (goalData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

export const getRestaurants = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const deleteRestaurant = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
