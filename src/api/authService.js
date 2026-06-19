// src/api/authService.js
import axiosClient from './axiosClient';

export async function login(username, password) {
    const res = await axiosClient.post('/Api/endpoint/login.php', { username, password });
    return res.data;
}

export async function logout() {
    const res = await axiosClient.post('/Api/endpoint/logout.php');
    return res.data;
}

export async function register(username, password, email) {
    const res = await axiosClient.post('/Api/endpoint/register.php', { username, password });
    return res.data;
}