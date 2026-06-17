import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Post({id, username, role, content, creation_date, onDelete, onEdit}) {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Text style={styles.yellowText}>{username}</Text>
                <Text style={styles.thinText}>{role}</Text>
            </View>
            <View style={styles.postBody}>
                {!isEditing ? (
                    <Text style={styles.greyText}>{content}</Text>
                ) : (
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        style={styles.greyText}
                    />
                )}
                <View style={styles.postDate}>
                    <Text style={styles.thinText}>{creation_date}</Text>
                </View>
            </View>
            
            
            {!isEditing ? (
                <View style={styles.postFooter}>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonStyle} onPress={() => setIsEditing(!isEditing)}>
                            <Ionicons name="create" size={24} color="green" />
                        </Pressable>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonStyle} onPress={() => {onDelete(id)}}>
                            <Ionicons name="trash" size={24} color="red" />
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View style={styles.postFooter}>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonStyle} onPress={() => setIsEditing(!isEditing)}>
                            <Ionicons name="arrow-back" size={24} color="#202020" />
                        </Pressable>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonStyle} onPress={() => {onEdit(id, text); setIsEditing(!isEditing);}}>
                            <Ionicons name="save" size={24} color="green" />
                        </Pressable>
                    </View>
                </View>
            )}
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
    },
    postBody: {
        flex: 2,
        marginBottom: 5,
    },
    postDate: {
        flex: 1,
        alignItems: 'flex-end',
        borderWidth: 1,
        borderBottomColor: '#5b5b5b',
    },
    postFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',

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
});