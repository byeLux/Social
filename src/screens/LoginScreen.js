import { logError } from '../utils/errorHandling';
import { useState } from 'react';
import {View, Pressable, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from '../components/Error';
import LabelAndInput from '../components/LabelAndInput';
import { login } from '../api/authService';

export default function LoginScreen({ onLoginSuccess, onGoToRegister }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit() {
    if (!username.trim() || !password) {
        setErrorMessage('Please enter both username and password.');
        setError(true);
        return;
    }

    try {
        const result = await login(username, password);

        if (!result?.token) {
            setErrorMessage('Login failed.\nInvalid server response.');
            setError(true);
            return;
        }

        setError(false);
        setErrorMessage('');
        onLoginSuccess(result.token);
    } catch (error) {
        logError(error);

        if (error.response) {
            setErrorMessage('Login failed.\nPlease check your credentials.');
        } else if (error.request) {
            setErrorMessage('Network error.\nServer might be unreachable.');
        } else {
            setErrorMessage('An error occurred while trying to log in.\nPlease try again later.');
        }
        setError(true);
    }
}

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
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
                    <Pressable 
                        onPress={handleSubmit} 
                        style={styles.buttonStyle} 
                        android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </Pressable>
                    <Text style={styles.greyText}>Not registered yet? Create an account</Text>
                    <Pressable 
                        onPress={() => {onGoToRegister()}} 
                        style={styles.buttonStyle} 
                        android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}
                    >
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.footer}>
                {error && <Error error={errorMessage} />}
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020'
    },
    scroll: {
        width: '100%',
    },
    content: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    greyText: {
        color: '#c8c8c8',
        fontWeight: 'bold',
    },
    form: {
        flexShrink: 0,
        justifyContent: 'space-between',
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#565656',
        fontWeight: 'bold',
    },
    footer: {
        width: '100%',
        paddingBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },

});
