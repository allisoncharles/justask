import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export const storeUser = async (session) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/users`, session);

    return res;
  } catch (err) {
    return err.response;
  }
};

export const getUser = async (email) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users/${email}`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/users`);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateToken = async (user) => {
  try {
    const res = await axios.put(`/api/users`, user);
    return res;
  } catch (err) {
    return err.response;
  }
};
