import { useState } from 'react';
import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from './Error';
import LabelAndInput from './LabelAndInput';
import { login } from '../api/authService';


export default function LoginForm({ onLoginSuccess }) {
    // 1. Tieni tu i valori in uno state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit() {
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
            <View style={styles.form} id='login-form'>
                <LabelAndInput
                    label={"USERNAME"}
                    inputValue={username}
                    inputOnChangeText={setUsername}
                    inputPlaceholder={"Username"}
                    isSecure={false}
                />
                <LabelAndInput
                    label={"PASSWORD"}
                    inputValue={password}
                    inputOnChangeText={setPassword}
                    inputPlaceholder={"Password"}
                    isSecure={true}
                />
                <View id='form-button-container'>
                    <Pressable onPress={async () => {
                        const ok = await handleSubmit();
                        if (ok.token) { onLoginSuccess(ok.token); } // ✅ cambia schermata
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
        flex: 3,
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
    textInput: {
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },

});