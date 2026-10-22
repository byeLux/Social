// src/api/authService.js
import axiosClient from './axiosClient';
import * as SecureStore from 'expo-secure-store';

export async function login(username, password) {
    try {
        const res = await axiosClient.post('/Api/endpoint/login.php', { username, password });
        await SecureStore.setItemAsync('token', res.data.token);
        return res.data;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
}


export async function logout(token) {
    try {
        const res = await axiosClient.post('/Api/endpoint/logout.php', { token });
        return res.data;
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
    } finally {
        await SecureStore.deleteItemAsync('token');
    }
}

export async function register(username, password, confirmPassword) {
    try {
        const res = await axiosClient.post('/Api/endpoint/register.php', { username, password, confirmPassword });
        return res.data;
    } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
}