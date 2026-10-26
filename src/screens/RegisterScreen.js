import { logError } from '../utils/errorHandling';
import { useState } from 'react';
import {View, Pressable, Text, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Error from '../components/Error';
import LabelAndInput from '../components/LabelAndInput';
import { register } from '../api/authService';

export default function RegisterScreen({ onRegisterSuccess, onGoToLogin }) {
    // 1. Tieni tu i valori in uno state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit() {
        try {
            if (password !== repeatedPassword) {
                setErrorMessage('Passwords do not match.');
                setError(true);
                return;
            }
            const result = await register(username, password, repeatedPassword);
            setError(false);
            setErrorMessage('');
            return result;
        } catch (error) {
            logError(error);

            if (error.response) {
                setErrorMessage('Registration failed.\nPlease check your credentials.');
            } else if (error.request) {
                setErrorMessage('Network error.\nServer might be unreachable.');
            } else {
                setErrorMessage('An error occurred while trying to register.\nPlease try again later.');
            }
            setError(true);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <View style={styles.title}>
                <Text style={[styles.yellowText, {fontSize: 35}]}>CREATE YOUR ACCOUNT</Text>
            </View>
            <View style={styles.form} id='register-form'>
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
                <LabelAndInput
                    label={"REPEAT PASSWORD"}
                    inputValue={repeatedPassword}
                    inputOnChangeText={setRepeatedPassword}
                    inputPlaceholder={"Password"}
                    isSecure={true}
                />
                <View id='form-button-container'>
                    <Pressable 
                        onPress={async () => {
                            const ok = await handleSubmit();
                            if (ok?.success) { onRegisterSuccess(); }
                        }} 
                        style={styles.buttonStyle} 
                        android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}
                    >
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
                    <Text style={styles.greyText}>Already have an account? Log in</Text>
                    <Pressable 
                        onPress={() => {onGoToLogin()}}
                        style={styles.buttonStyle} 
                        android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
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
        backgroundColor: '#202020',
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
