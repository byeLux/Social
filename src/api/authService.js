// src/api/authService.js
import axiosClient from './axiosClient';
import * as SecureStore from 'expo-secure-store';

export async function login(username, password) {
    const res = await axiosClient.post('/Api/endpoint/login.php', { username, password });
    await SecureStore.setItemAsync('token', res.data.token);
    return res.data;
}


export async function logout(token) {
    const res = await axiosClient.post('/Api/endpoint/logout.php', { token });
    await SecureStore.deleteItemAsync('token');
    return res.data;
}

export async function register(username, password, confirmPassword) {
    const res = await axiosClient.post('/Api/endpoint/register.php', { username, password, confirmPassword });
    return res.data;
}