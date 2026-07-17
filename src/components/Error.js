import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Error({ error }) {
    return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.redText}>{error}</Text>
            <Image source={require('../../assets/dictator.jpg')} style={{width: 200, height: 200}} />
            <Text style={styles.redText}>(El Dictator non è soddisfatto)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    redText: {
        color: 'red',
        textAlign: 'center',
    },
})