import { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '../components/HomeHeader.js';
import Post from '../components/Post.js';
import Error from '../components/Error.js';
import PostForm from '../components/PostForm.js';
import Pagination from '../components/Pagination.js';
import { getPosts, createPost, updatePost, deletePost } from '../api/postService.js';
import { getUser } from '../api/userService.js';
import { useErrorHandling } from '../hooks/useErrorHandling.js';
import { capitalize } from '../utils/stringUtils.js';

export default function HomeScreen({token, onLogout}) {

    const [posts, setPosts] = useState([]);

    const [totalPages, setTotalPages] = useState(1);

    const [lastVisitedPage, setLastVisitedPage] = useState(1);

    const [userName, setUserName] = useState();

    const [userRole, setUserRole] = useState('');

    const { error, errorMessage, setError, setErrorMessage, withErrorHandling } = useErrorHandling(onLogout);

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

    async function loadUser(token) {
        const result = await withErrorHandling(() => getUser(token), 'user');
        if (!result) return;
        setUserRole(result.role);
        setUserName(result.username);
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

    useEffect(() => {
        const fetchData = async () => {
            await loadUser(token);
            await loadPosts(1);
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <HomeHeader 
                withErrorHandling={withErrorHandling}
                onLogout={onLogout}
                token={token}
                userName={capitalize(userName)}
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
                renderItem={({ item }) => 
                    <Post {...item} 
                        itsMe={item.username === userName} 
                        canDelete={userRole === 'admin'} 
                        canEdit={ userRole === 'admin' || userRole === 'mod' } 
                        onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />
            <Pagination 
                totalPages={totalPages} 
                setLastVisitedPage={setLastVisitedPage} 
                loadPosts={loadPosts}
                loadUser={loadUser} 
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
