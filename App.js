import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import LoginForm from './src/components/LoginForm';
import Home from './src/screens/Home';

export default function App() {
  const [tokenFromApi, setToken] = useState('');

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#1a1a1a');
    NavigationBar.setButtonStyleAsync('light'); // icone bianche
  }, []);

  return (
    <SafeAreaProvider>
      {
        (tokenFromApi)
        ? <Home token={tokenFromApi} onLogout={() => {setToken('');}} />
        : <LoginForm onLoginSuccess={(token) => {setToken(token);}} />
      }
    </SafeAreaProvider>
  );
}