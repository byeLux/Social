import {View, Pressable, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function PostFooter({ isEditing, setIsEditing, onDelete, onEdit, id, text }) {
    if (!isEditing) {
        return (
            <View style={styles.postFooter}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.buttonStyle}
                        onPress={() => setIsEditing(true)}
                        android_ripple={{ color: '#00ff00', borderless: false, foreground: true }}
                    >
                        <Ionicons name="create" size={24} color="green" />
                    </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.buttonStyle}
                        onPress={() => onDelete(id)}
                        android_ripple={{ color: '#ff0000', borderless: false, foreground: true }}
                    >
                        <Ionicons name="trash" size={24} color="red" />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.postFooter}>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonStyle}
                    onPress={() => setIsEditing(false)}
                    android_ripple={{ color: '#000000', borderless: false, foreground: true }}
                >
                    <Ionicons name="arrow-back" size={24} color="#202020" />
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.buttonStyle}
                    onPress={() => { onEdit(id, text); setIsEditing(false); }}
                    android_ripple={{ color: '#00ff00', borderless: false, foreground: true }}
                >
                    <Ionicons name="save" size={24} color="green" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    buttonContainer: {
        width: 45,
        margin: 5,
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
});