import { View, Text, StyleSheet } from 'react-native';

export default function Error({ error }) {
    return (
        <View style={styles.container}>
            <Text style={styles.redText}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    redText: {
        color: 'red',
        textAlign: 'center',
        width: '100%',
    },
});
