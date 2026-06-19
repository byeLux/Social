import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from './Error';
import { login } from '../src/api/authService';


export default function LoginForm({ onLoginSuccess }) {
    // 1. Tieni tu i valori in uno state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit() {
        console.log('submitting...');
        try {
            const result = await login(username, password);
            setError(false);
            setErrorMessage('');
            return result;
        } catch (error) {
            console.error('Full error:', error);

            if (error.response) {
                setErrorMessage('Login failed.\nPlease check your credentials.');
            } else if (error.request) {
                setErrorMessage('Network error.\nServer might be unreachable.');
            } else {
                setErrorMessage('An error occurred while trying to log in.\nPlease try again later.');
            }
            setError(true);
            return;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={[styles.yellowText, {fontSize: 35}]}>WELCOME BACK</Text>
            </View>
            {/* 3. Ogni campo aggiorna il suo state */}
            <View style={styles.form} id='login-form'>
                {/* style={[{marginBottom: 20}]} */}
                <View>
                    <Text style={[styles.yellowText, {fontSize: 25}]}>USERNAME</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Username"
                        style={styles.textInput}
                    />
                </View>
                {/* style={[{marginBottom: 20}]} */}
                <View>
                    <Text style={[styles.yellowText, {fontSize: 25}]}>PASSWORD</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry
                        style={styles.textInput}
                    />
                </View>
                <View id='form-button-container'>
                    <Pressable onPress={async () => {
                        const ok = await handleSubmit();
                        console.log(ok);
                        if (ok.token) {onLoginSuccess(ok.token); console.log("Redirecting...");} // ✅ cambia schermata
                    }} style={styles.buttonStyle} android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.footer}>
                {error && <Error error={errorMessage} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#202020'
    },
    title: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    form: {
        flex: 3,
        justifyContent: 'space-between',
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
    },
    footer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteText: {
        color: 'white',
    },
    textInput: {
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },

});