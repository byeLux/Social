import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export async function getItemAsync(key) {
    return Platform.OS === 'web'
        ? localStorage.getItem(key)
        : SecureStore.getItemAsync(key);
}

export async function setItemAsync(key, value) {
    if (Platform.OS === 'web') localStorage.setItem(key, value);
    else await SecureStore.setItemAsync(key, value);
}

export async function deleteItemAsync(key) {
    if (Platform.OS === 'web') localStorage.removeItem(key);
    else await SecureStore.deleteItemAsync(key);
}
