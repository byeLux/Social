// src/api/postsService.js
import axiosClient from './axiosClient';

export async function getPosts(page, token) {
    const res = await axiosClient.get(`/Api/controller/PostController.php?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

export async function createPost(content, token) {
    console.log("creating post...");
    try {
            const res = await axiosClient.post(
            '/Api/endpoint/createPost.php',
            { content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Repsonse della CREATE: " + res);
        return res;
    } catch (error) {
        console.error('Full error:', error);
        console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
        console.error('Method:', error.config?.method);
        return error;
    }
}

export async function updatePost(postId, editedContent, token) {
    try {
        const res = await axiosClient.post(
            '/Api/endpoint/editPost.php',
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
        console.log("Repsonse della UPDATE: " + res);
        return res;
    } catch (error) {
        console.error('Full error:', error);
        console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
        console.error('Method:', error.config?.method);
        return error;
    } 
}

export async function deletePost(postId, token) {
    try {
       const res = await axiosClient.post(
            '/Api/endpoint/deletePost.php',
            {
                post_id: postId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Repsonse della DELETE: " + res);
        return res; 
    } catch (error) {
        console.error('Full error:', error);
        console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
        console.error('Method:', error.config?.method);
        return error;
    }
}