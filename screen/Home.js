import { useEffect, useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button, ScrollView, FlatList, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function Home({token}) {

    const API_BASE = 'http://10.10.55.199:8888/socialApi';

    const [lastId, setId] = useState();

    const [posts, setPosts] = useState([]);

    const [user, setUser] = useState();

    const [userName, setUserName] = useState('loading...');

    function getUser(token) {
        console.log('getting user...')
        axios
            .get(`${API_BASE}/Api/endpoint/getUser.php`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log(JSON.stringify(response.data.user, null, 2));
                setUser(response.data.user);
                setUserName(response.data.user.username);
                console.log('username is: ' + userName);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function loadPosts(token) {
        console.log('loading posts...');
        axios
            .get(`${API_BASE}/Api/controller/PostController.php`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log(JSON.stringify(response.data.posts, null, 2));
                setPosts(response.data.posts);
                console.log('success');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function handleEdit(id) {
        console.log(id);
    }

    function handleDelete(id) {
        setPosts(posts.filter(p => p.id !== id));
    }

    function handlePublish(text) {
        const newId = Math.max(...posts.map(p => p.id)) + 1;
        // const newId = lastId + 1;
        // setId(newId);
        setPosts([
            ...posts,
            {
                id: newId,
                user_id: user.user_id,
                username: user.username,
                role: user.role,
                content: text,
                creation_date: Date.now(),
                delete_date: false
            }
        ]);

    };

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
                    <Pressable style={styles.logOutButton}>
                        <Ionicons name="log-out" size={24} color="#202020" />
                    </Pressable>
                </View>
            </View>

            <View>
                <PostForm publish={handlePublish}/>
            </View>

            <FlatList
                data={posts}
                renderItem={({ item }) => <Post {...item} onDelete={handleDelete} onEdit={handleEdit}/>}
                keyExtractor={item => item.id.toString()}
            />

            <Pressable onPress={() => {loadPosts(token); getUser(token);}} style={styles.buttonStyle}>
                <Text>LOAD POSTS</Text>
            </Pressable>
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
});