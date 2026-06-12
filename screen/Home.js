import { useEffect, useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button, ScrollView, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import axios from 'axios';

export default function Home({token}) {

    const API_BASE = 'http://10.10.55.23:8888/socialApi';

    const [lastId, setId] = useState();

    const [posts, setPosts] = useState([]);

    function getUser(token) {}

    function loadPosts(token) {
        console.log(token);
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
            })
            .catch((error) => {
                console.error(error);
            });
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
                user: 'test',
                role: 'test',
                content: text,
                date: Date.now()
            }
        ]);

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View>
                <View style={styles.title}>
                    <Text style={[styles.yellowText, styles.sizeText]}>HOME</Text>
                </View>
                <PostForm publish={handlePublish}/>
            </View>
            <FlatList
                data={posts}
                renderItem={({ item }) => <Post {...item} onDelete={handleDelete} />}
                keyExtractor={item => item.id.toString()}
            />
            <Pressable onPress={() => loadPosts(token)}>
                <Text>Ricarica</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header:{
        flex: 1,  //FAI USCIRE LA VIEW DI HOME E POSTFORM DALL HEADER ELLA FLASTLIST
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#202020',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
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