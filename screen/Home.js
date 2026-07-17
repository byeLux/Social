import { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/HomeHeader';
import Post from '../components/Post';
import Error from '../components/Error';
import PostForm from '../components/PostForm';
import Pagination from '../components/Pagination';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { getPosts, createPost, updatePost, deletePost } from '../src/api/postService';
import { getUser } from '../src/api/userService';

export default function Home({token, onLogout}) {;

    const [lastId, setId] = useState();

    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [posts, setPosts] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [lastVisitedPage, setLastVisitedPage] = useState(1);

    const ERROR_MESSAGES = {
        load:   { response: 'Posts failed to load.\nPlease check your connection.',    unknown: 'An error occurred while loading the posts.\nPlease try again later.' },
        update: { response: 'Post failed to update.\nPlease check your connection.',   unknown: 'An error occurred while updating the post.\nPlease try again later.' },
        delete: { response: 'Post failed to delete.\nPlease check your connection.',   unknown: 'An error occurred while deleting the post.\nPlease try again later.' },
        create: { response: 'Post creation failed.\nPlease check your connection.',    unknown: 'An error occurred while creating the post.\nPlease try again later.' },
        user:   { response: 'User failed to load.\nPlease check your connection.',    unknown: 'An error occurred while loading the user.\nPlease try again later.' },
    };

    const NETWORK_ERROR_MESSAGE = 'Network error.\nServer might be unreachable.';

    function logError(error) {
        console.error('Full error:', error);
        console.error('URL chiamato:', error.config?.baseURL, error.config?.url);
        console.error('Method:', error.config?.method);
    }

    async function withErrorHandling(operation, errorKey) {
        setError(false);
        setErrorMessage('');
        try {
            const result = await operation();
            return result;
        } catch (error) {
            logError(error);
            const messages = ERROR_MESSAGES[errorKey];
            if (error.response)      setErrorMessage(messages.response);
            else if (error.request)  setErrorMessage(NETWORK_ERROR_MESSAGE);
            else                     setErrorMessage(messages.unknown);
            setError(true);
            return null; // esplicito: valore di fallback coerente con i controlli "if (!result)"
        }
    }

    // Helper per evitare di duplicare la validazione "post vuoto"
    function validateNotEmpty(text) {
        if (text.trim().length > 0) return true;
        setError(true);
        setErrorMessage("Il post non può essere vuoto!");
        return false;
    }

    async function loadPosts(pages) {
        const result = await withErrorHandling(() => getPosts(pages, token), 'load');
        if (!result) return;
        setPosts(result.posts);
        setTotalPages(result.pagination.total_pages);
    }

    async function handlePublish(text) {
        if (!validateNotEmpty(text)) return;

        const result = await withErrorHandling(() => createPost(text, token), 'create');
        if (!result) return;

        await loadPosts(1);
        setLastVisitedPage(1);
    }

    async function handleEdit(id, editedContent) {
        if (!validateNotEmpty(editedContent)) return;

        const result = await withErrorHandling(() => updatePost(id, editedContent, token), 'update');
        if (!result) return;

        await loadPosts(lastVisitedPage);
    }

    async function handleDelete(id) {
        const result = await withErrorHandling(() => deletePost(id, token), 'delete');
        if (!result) return;

        await loadPosts(lastVisitedPage);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <HomeHeader 
                withErrorHandling={withErrorHandling}
                onLogout={onLogout}
                token={token}
            />
            {error ? (
                    <View>
                        <PostForm publish={handlePublish}/>
                        <Error error={errorMessage} />
                    </View>
                ) : (
                     <View>
                        <PostForm publish={handlePublish}/>
                    </View>
                )
            }
            <FlatList
                data={posts}
                renderItem={({ item }) => <Post {...item} isAdmin={item.role === 'admin'} onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />
            <Pagination 
                totalPages={totalPages} 
                setLastVisitedPage={setLastVisitedPage} 
                loadPosts={loadPosts} 
                token={token}
                currentPage={lastVisitedPage}
            /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#202020',
    },
});