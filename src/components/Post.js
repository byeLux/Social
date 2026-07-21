import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import PostFooter from './PostFooter';
import { capitalize } from '../utils/stringUtils';

export default function Post({id, username, itsMe, role, canDelete, canEdit, content, creation_date, onDelete, onEdit}) {

    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content);
    const date = new Date(creation_date);

    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Text style={styles.yellowText}>{capitalize(username)}{itsMe && ' (You)'}</Text>
                <Text style={[styles.thinText, role == 'user' ? (styles.userColor) : (styles.adminColor)]}>{role}</Text>
            </View>
            <View style={styles.postBody}>
                {
                    canEdit ? (
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
                <View style={[styles.postDate, canEdit && { borderBottomColor: '#5b5b5b', borderBottomWidth: 1 }]}>
                    <Text style={styles.thinText}>{date.toLocaleString()}</Text>
                </View>
            </View>
            
            {canEdit && (
                <PostFooter
                    isEditing={isEditing}
                    canDelete={canDelete}
                    setIsEditing={setIsEditing}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    id={id}
                    text={text}
                />
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
        fontSize: 17, 
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
        fontWeight: '700',
        fontSize: 16,
    },
    adminColor: {
        color: '#ff00e6',
    },
    userColor: {
        color: '#b6ff49',
    }
});