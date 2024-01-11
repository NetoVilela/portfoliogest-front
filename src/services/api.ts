import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 300000,
});

export const axiosAuth = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 300000,
});