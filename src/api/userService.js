// // src/api/userService.js
import axiosClient from './axiosClient';

export async function getUser(token) {
    const res = await axiosClient.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.user;
}

