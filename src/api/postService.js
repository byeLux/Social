// src/api/postsService.js
import axiosClient from './axiosClient';

export async function getPosts(token) {
    const res = await axiosClient.get('/Api/controller/PostController.php', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.posts;
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
        console.log(res)
    } catch (error) {
        console.error('Full error:', error);
        console.error('Full error:', error);
        console.error('Full error:', error);
        console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
        console.error('Method:', error.config?.method);
    }
    return getPosts(token);
}

export async function updatePost(postId, editedContent, token) {
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
    return getPosts(token);
}

export async function deletePost(postId, token) {
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
    return getPosts(token);
}