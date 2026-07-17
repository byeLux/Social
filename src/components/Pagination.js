import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';

export default function Pagination({ totalPages, loadPosts, setLastVisitedPage, token, currentPage }) {
    function goToPage(page) {
        const clamped = Math.max(1, Math.min(page, totalPages));
        loadPosts(clamped, token);
        setLastVisitedPage(clamped);
    }

    return (
        <View style={styles.pagination}>
            <Pressable
                style={styles.doubleArrowsButton}
                disabled={currentPage <= 1}
                onPress={() => goToPage(1)}
            >
                <Ionicons name="chevron-back-outline" size={24} color="#202020" style={{ marginLeft: 5 }}/>
                <Ionicons name="chevron-back-outline" size={24} color="#202020" style={{ marginLeft: -15 }}/>
            </Pressable>
            <Pressable
                style={styles.pageButton}
                disabled={currentPage <= 1}
                onPress={() => goToPage(currentPage - 1)}
            >
                <Ionicons name="chevron-back-outline" size={24} color="#202020" />
            </Pressable>

            <Pressable style={styles.pageButton} onPress={() => goToPage(currentPage)}>
                <Text style={styles.buttonText}>{currentPage}</Text>
            </Pressable>

            <Pressable
                style={styles.pageButton}
                disabled={currentPage >= totalPages}
                onPress={() => goToPage(currentPage + 1)}
            >
                <Ionicons name="chevron-forward-outline" size={24} color="#202020" />
            </Pressable>
            <Pressable
                style={styles.doubleArrowsButton}
                disabled={currentPage >= totalPages}
                onPress={() => goToPage(totalPages)}
            >
                <Ionicons name="chevron-forward-outline" size={24} color="#202020" style={{ marginLeft: 7 }}/>
                <Ionicons name="chevron-forward-outline" size={24} color="#202020" style={{ marginLeft: -15 }}/>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        padding: 5,
    },
    disabledButton: {
        backgroundColor: '#f9ead3',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
    },
    doubleArrowsButton: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        width: 45,
        flexDirection: 'row',
        alignItems: 'center',
    }
})