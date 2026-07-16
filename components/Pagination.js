import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';

export default function Pagination({ totalPages, loadPosts, setLastVisitedPage, token }) {
    return(
        <View style={styles.pagination}>
            {
                [...Array(totalPages)].map((_, i) => (
                    <Pressable key={i + 1} onPress={() => {loadPosts(i + 1, token); setLastVisitedPage(i + 1)}} style={styles.pageButton} android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}>
                        <Text style={styles.buttonText}>{i + 1}</Text>
                    </Pressable>
                ))
            }
        </View>
    )
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
        color: '#565656',
        fontWeight: 'bold',
        padding: 5,
    },
})