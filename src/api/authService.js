import { logError } from '../utils/errorHandling';
// src/api/authService.js
import axiosClient from './axiosClient';
import * as SecureStore from '../utils/tokenStorage';

export async function login(username, password) {
    try {
        const res = await axiosClient.post('/auth/login', { username, password });
        await SecureStore.setItemAsync('token', res.data.token);
        return res.data;
    } catch (error) {
        logError(error);
        throw error;
    }
}


export async function logout(token) {
    try {
        const res = await axiosClient.post('/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        logError(error);
    } finally {
        await SecureStore.deleteItemAsync('token');
    }
}

export async function register(username, password, confirmPassword) {
    try {
        const res = await axiosClient.post('/auth/register', {
            username, password, 'password-check': confirmPassword,
        });
        return res.data;
    } catch (error) {
        logError(error);
        throw error;
    }
}
