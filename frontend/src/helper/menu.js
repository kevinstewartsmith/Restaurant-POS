import axios from "axios";
import { getToken } from "./user";

const API_URL = "/api/menus/";

export const createMenu = async (menuData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.post(API_URL, menuData, config);

  return response.data;
};

export const getMenus = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const deleteMenu = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
