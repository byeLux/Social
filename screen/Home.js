import { useEffect, useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button, ScrollView, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../components/Post';
import Error from '../components/Error';
import PostForm from '../components/PostForm';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function Home({token, onLogout}) {

    const API_BASE = 'http://10.10.54.67/socialApi';

    const [lastId, setId] = useState();

    const [error, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState();

    const [userName, setUserName] = useState('loading...');

    const [userRole, setUserRole] = useState('');

    const [totalPages, setTotalPages] = useState(1);

    const capitalize = (str = '') => {
        return str.length
            ? str.charAt(0).toUpperCase() + str.slice(1)
            : '';
    };

    function getUser(token) {
        console.log('getting user...')
        try {
            axios.get(`${API_BASE}/Api/endpoint/getUser.php`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                })
                .then((response) => {
                    //console.log(JSON.stringify(response.data.user, null, 2));
                    setError(false);
                    setErrorMessage('');
                    setUser(response.data.user);
                    setUserName(capitalize(response.data.user.username));
                    setUserRole(response.data.user.role);
                    console.log('User loaded!');
                })
                .catch((error) => {
                    console.error(error);
                    setError(true);
                    setErrorMessage('An error occurred while fetching user data.');
                });
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Api error.');
        }
    }

    function loadPosts(token, pages) {
        console.log('loading posts...');
        try {
            axios.get(`${API_BASE}/Api/controller/PostController.php?page=${pages}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                //console.log(JSON.stringify(response.data, null, 2));
                setError(false);
                setErrorMessage('');
                setPosts(response.data.posts);
                setTotalPages(response.data.pagination.total_pages);
                getUser(token);
                console.log('Posts loaded!');
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setErrorMessage('An error occurred while fetching posts.');
            });
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Api error.');
        }
    }

    function handleEdit(id, editedContent) {
        try {
            axios.post(`${API_BASE}/Api/endpoint/editPost.php`,
                {
                    post_id: id,
                    content: editedContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                //console.log(JSON.stringify(response.data, null, 2));
                setError(false);
                setErrorMessage('');
                setPosts(response.data.posts);
                loadPosts(token);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setErrorMessage('An error occurred while editing the post.');
            });
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Api error.');
        }
    }

    function handleDelete(id) {
        try {
            axios.post(`${API_BASE}/Api/endpoint/deletePost.php`,
                {
                    post_id: id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                //console.log(JSON.stringify(response.data, null, 2));
                setError(false);
                setErrorMessage('');
                setPosts(response.data.posts);
                loadPosts(token);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setErrorMessage('An error occurred while deleting the post.');
            });
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Api error.');
        }
    }

    function handlePublish(text) {
        try {
            axios.post(`${API_BASE}/Api/endpoint/createPost.php`,
                {
                    user_id: user.user_id,
                    content: text
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                //console.log(JSON.stringify(response.data, null, 2));
                setError(false);
                setErrorMessage('');
                setPosts(response.data.posts);
                loadPosts(token);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
                setErrorMessage('An error occurred while creating the post.');
            });
        } catch (error) {
            console.error(error);
            setError(true);
            setErrorMessage('Api error.');
        }
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

            <View>
                <PostForm publish={handlePublish}/>
            </View>

            {!error ? (
              <FlatList
                data={posts}
                renderItem={({ item }) => <Post {...item} isAdmin={userRole === 'admin'} onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
            />  
            ) : (<Error error={errorMessage} />)}

            <View style={styles.pagination}>
                {
                    [...Array(totalPages)].map((_, i) => (
                        <Pressable key={i + 1} onPress={() => {loadPosts(token, i + 1)}} style={styles.pageButton} android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}>
                            <Text style={styles.buttonText}>{i + 1}</Text>
                        </Pressable>
                    ))
                }
            </View>

            {/* <Pressable onPress={() => {loadPosts(token); getUser(token);}} style={styles.buttonStyle}>
                <Text>LOAD POSTS</Text>
            </Pressable> */}
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