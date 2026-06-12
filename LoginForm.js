import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';

export default function LoginForm() {
    // 1. Tieni tu i valori in uno state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 2. Gestisci tu l'invio
    function handleSubmit() {
        console.log(username, password);
    }

    return (
        <View>
            {/* 3. Ogni campo aggiorna il suo state */}
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                style={styles.yellowText}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.yellowText}
            />
            <Pressable onPress={handleSubmit}>
                <Text>Accedi</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    yellowText: {
        color: 'yellow',
    },
    blue: {
        backgroundColor: 'blue',
    },

});