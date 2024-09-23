import axios from "axios";
import { store } from "./redux/store";

const BACKEND_URL = "https://chat-be-8ujr.onrender.com/api";
// const BACKEND_URL = "http://localhost:4000/api";

export const publicRequest = axios.create({
  baseURL: BACKEND_URL,
});

export const getPrivateRequest = () => {
  const state = store.getState();
  const token = state.user?.user?.token;

  return axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
