import {View, Pressable, Text, StyleSheet, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader({withErrorHandling, onLogout, token, userName}) {

    function handleLogout() {
        onLogout(true);
    }

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <Image
                    source={require('../../assets/avatar.webp')}
                    style={{ width: 50, height: 50 }}/>
                <Text style={styles.yellowText}>{userName}</Text>
            </View>
            <View style={styles.center}>
                <Text style={[styles.yellowText, styles.sizeText]}>HOME</Text>
            </View>
            <View style={styles.right}>
                <Pressable style={styles.logOutButton} onPress={handleLogout} android_ripple={{ color: '#ff4800', borderless: false, foreground: true }}>
                    <Ionicons name="log-out" size={24} color="#202020" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 6,
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold',
        fontSize: 17, 
    },
    logOutButton: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
    },
    sizeText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
});