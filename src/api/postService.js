import { logError } from '../utils/errorHandling';
// src/api/postsService.js
import axiosClient from './axiosClient';

export async function getPosts(page, token) {
    const res = await axiosClient.get('/posts', {
        params: { page },
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

export async function createPost(content, token) {
    try {
            const res = await axiosClient.post(
            '/posts',
            { content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        logError(error);
        throw error;
    }
}

export async function updatePost(postId, editedContent, token) {
    try {
        const res = await axiosClient.put(
            `/posts/${encodeURIComponent(postId)}`,
            {
                post_id: postId,
                content: editedContent,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        logError(error);
        throw error;
    } 
}

export async function deletePost(postId, token) {
    try {
       const res = await axiosClient.delete(
            `/posts/${encodeURIComponent(postId)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        return res; 
    } catch (error) {
        logError(error);
        throw error;
    }
}
