import axios from "axios";
export const api = axios.create({
  baseURL: process.env.IP_LOCAL + ":3333",
});
