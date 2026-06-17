import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import LoginForm from './components/LoginForm';
import Home from './screen/Home';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenFromApi, setToken] = useState('');

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#1a1a1a');
    NavigationBar.setButtonStyleAsync('light'); // icone bianche
  }, []);

  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={(token) => {
        setToken(token);
        setIsLoggedIn(true);
    }} />;
  }

  return (
    <SafeAreaProvider>
      <Home token={tokenFromApi} onLogout={() => {
          setIsLoggedIn(false);
          setToken('');
      }} />
    </SafeAreaProvider>
  );
}