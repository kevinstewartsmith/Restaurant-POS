import axios from "axios";
import { getToken } from "./user";

const API_URL = "/api/goals/";

export const createGoal = async (goalData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

export const getGoals = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

export const deleteGoal = async (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
