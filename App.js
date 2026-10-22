import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [token, setToken] = useState(null);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    SecureStore.getItemAsync('token')
    .then((token) => { if (token) setToken(token); });
  }, []);

  let currentScreen = null;
  if (token) {
    currentScreen = <HomeScreen token={token} onLogout={() => setToken(null)} />;
  } else if (authScreen === 'register') {
    currentScreen = <RegisterScreen onRegisterSuccess={() => setAuthScreen('login')} onGoToLogin={() => setAuthScreen('login')}/>;
  } else {
    currentScreen = <LoginScreen onLoginSuccess={setToken} onGoToRegister={() => setAuthScreen('register')}/>;
  }

  return <SafeAreaProvider>{currentScreen}</SafeAreaProvider>;
}