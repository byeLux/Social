import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Error({ error }) {
    return(
        <View>
            <Text style={styles.redText}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    redText: {
        color: 'red',
        textAlign: 'center',
    },
})