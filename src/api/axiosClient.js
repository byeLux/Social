// src/api/axiosClient.js
import axios from 'axios';
import { API_BASE } from '../config';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
});

export default axiosClient;