import axios from 'axios';
import { APP_URL } from '../config';

const AxiosInstance = axios.create({
  baseURL: APP_URL,
  timeout: 10000, // Adjust the timeout as needed
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;
