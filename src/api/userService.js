// // src/api/userService.js
import axiosClient from './axiosClient';

export async function getUser(token) {
    const res = await axiosClient.get('/Api/endpoint/getUser.php', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.user;
}

