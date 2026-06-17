import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostForm({publish}) {

    const [content, setContent] = useState('');
    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    placeholder='What are you thinking?'
                    placeholderTextColor='#d9d9d9'
                    onChangeText={setContent}
                    value={content}
                    multiline={true}
                    numberOfLines={4}
                    style={[styles.textInput, styles.greyText]}
                ></TextInput>
            </View>
            <View>
                <Pressable style={styles.buttonStyle} onPress={() => {publish(content); setContent('');}}>
                    <Text style={styles.buttonText}>POST </Text>
                    <Ionicons name="send" size={24} color="#565656" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: 5,
        borderColor: '#5b5b5b',
        borderWidth: 1,
        padding: 5,
        margin: 5,
    },
    inputContainer: {
        borderWidth: 1,
        borderBottomColor: '#5b5b5b',
    },
    textInput: {
        backgroundColor: '#5b5b5b',
        borderRadius: 5,
        height: 100,
    },
    postBody: {
        flex: 2,
    },
    postFooter: {
        flex: 1,
        alignItems: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    roleText: {
        color: '#FFD99F',
        fontWeight: 'thin', 
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        flexDirection: 'row',
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
    greyText: {
        color: '#d9d9d9',
    },
});