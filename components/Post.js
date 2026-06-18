import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Post({id, username, role, isAdmin, content, creation_date, onDelete, onEdit}) {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);
    const date = new Date(creation_date);
    const capitalize = (str = '') => {
        return str.length
            ? str.charAt(0).toUpperCase() + str.slice(1)
            : '';
    };
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Text style={styles.yellowText}>{capitalize(username)}</Text>
                <Text style={[styles.thinText, role == 'user' ? (styles.userColor) : (styles.adminColor)]}>{role}</Text>
            </View>
            <View style={styles.postBody}>
                {
                    isAdmin ? (
                        isEditing? (
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                style={[styles.greyText, styles.textInput]}
                            />
                        ) : (
                            <Text style={styles.greyText}>{content}</Text>
                        )
                    ) : 
                    (
                        <Text style={styles.greyText}>{content}</Text>
                    )
                }
                <View style={[styles.postDate, isAdmin && { borderBottomColor: '#5b5b5b', borderBottomWidth: 1 }]}>
                    <Text style={styles.thinText}>{date.toLocaleString()}</Text>
                </View>
            </View>
            
            {
                isAdmin && (
                    !isEditing ? (
                        <View style={styles.postFooter}>
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.buttonStyle} onPress={() => setIsEditing(!isEditing)} android_ripple={{ color: '#00ff00', borderless: false, foreground: true }}>
                                    <Ionicons name="create" size={24} color="green" />
                                </Pressable>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.buttonStyle} onPress={() => {onDelete(id)}} android_ripple={{ color: '#ff0000', borderless: false, foreground: true }}>
                                    <Ionicons name="trash" size={24} color="red" />
                                </Pressable>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.postFooter}>
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.buttonStyle} onPress={() => setIsEditing(!isEditing)} android_ripple={{ color: '#000000', borderless: false, foreground: true }}>
                                    <Ionicons name="arrow-back" size={24} color="#202020" />
                                </Pressable>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.buttonStyle} onPress={() => {onEdit(id, text); setIsEditing(!isEditing);}} android_ripple={{ color: '#00ff00', borderless: false, foreground: true }}>
                                    <Ionicons name="save" size={24} color="green" />
                                </Pressable>
                            </View>
                        </View>
                    )
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 5,
        borderColor: '#5b5b5b',
        borderWidth: 1,
        padding: 5,
        margin: 5,
    },
    postHeader: {
        flex: 1,
        borderWidth: 1,
        borderBottomColor: '#5b5b5b',
        paddingBottom: 5,
    },
    postBody: {
        flex: 2,
        marginBottom: 5,
        marginTop: 5,
    },
    postDate: {
        flex: 1,
        alignItems: 'flex-end',
        paddingBottom: 5,
    },
    postFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    textInput: {
        backgroundColor: '#5b5b5b',
        borderRadius: 5,
    },
    buttonContainer: {
        width: 45,
        margin: 5,
    },
    thinText: {
        color: '#FFD99F',
        fontWeight: 'thin',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    button: {
        marginLeft: 10,
        backgroundColor: '#FFD99F',
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
    greyText: {
        color: '#c8c8c8',
    },
    adminColor: {
        color: '#ff00e6',
    },
    userColor: {
        color: '#b6ff49',
    }
});