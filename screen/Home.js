import { useEffect, useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button, ScrollView, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

    const [user, setUser] = useState();

    const [userName, setUserName] = useState('loading...');

    const [userRole, setUserRole] = useState('');

    const [totalPages, setTotalPages] = useState(1);

    const [lastVisitedPage, setLastVisitedPage] = useState(1);

    const capitalize = (str = '') => {
        return str.length
            ? str.charAt(0).toUpperCase() + str.slice(1)
            : '';
    };

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
            if (error.response)     setErrorMessage(messages.response);
            else if (error.request) setErrorMessage(NETWORK_ERROR_MESSAGE);
            else                    setErrorMessage(messages.unknown);
            setError(true);
        }
    }

    async function loadUser(token) {
        const result = await withErrorHandling(() => getUser(token), 'user');
        if (!result) return;
        setUser(result);
        setUserName(capitalize(result.username));
        setUserRole(result.role);
    }

    async function loadPosts(pages) {
        const result = await withErrorHandling(() => getPosts(pages, token), 'load');
        if (!result) return;
        setPosts(result.posts);
        setTotalPages(result.pagination.total_pages);
        loadUser(token);
    }

    async function goToPage(page) {
        const result = await withErrorHandling(() => loadPosts(page, token), "load");
        if(result) setLastVisitedPage(page);
    }

    async function handlePublish(text) {
        if (text.trim().length > 0) {
            const result = await withErrorHandling(() => createPost(text, token), 'create');
            if (result) {
                loadPosts(1, token);
                setLastVisitedPage(1);
            }
        } else {
            setError(true);
            setErrorMessage("Il post non può essere vuoto!");
        }
    }

    async function handleEdit(id, editedContent) {
        if (editedContent.trim().length > 0) {
            const result = await withErrorHandling(() => updatePost(id, editedContent, token), 'update');
            if (result) loadPosts(lastVisitedPage, token);
        } else {
            setError(true);
            setErrorMessage("Il post non può essere vuoto!");
        }
    }

    async function handleDelete(id) {
        const result = await withErrorHandling(() => deletePost(id, token), 'delete');
        if (result) loadPosts(lastVisitedPage, token);
    }

    function handleLogout() {
        onLogout(true);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <Image
                        source={require('../assets/avatar.webp')}
                        style={{ width: 50, height: 50 }}/>
                    <Text style={styles.yellowText}>{userName}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={[styles.yellowText, styles.sizeText]}>HOME</Text>
                </View>
                <View style={styles.right}>
                    <Pressable style={styles.logOutButton} onPress={handleLogout} android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}>
                        <Ionicons name="log-out" size={24} color="#202020" />
                    </Pressable>
                </View>
            </View>
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
                renderItem={({ item }) => <Post {...item} isAdmin={userRole === 'admin'} onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />
            <Pagination 
                totalPages={totalPages} 
                setLastVisitedPage={setLastVisitedPage} 
                loadPosts={loadPosts} 
                token={token}
            /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#202020',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 6,
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold',
        fontSize: 17, 
    },
    logOutButton: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#565656',
        fontWeight: 'bold',
        padding: 5,
    },
    footer: {
        flex: 3,
    },
    whiteText: {
        color: 'white',
    },
    sizeText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    textInput: {
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    pageButton: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
    }
});