import {View, Pressable, Text, StyleSheet} from 'react-native';

export default function ModerationButton({onPressFunctions, icon}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.buttonStyle}
                onPress={onPressFunctions}
                android_ripple={{ color: '#00ff00', borderless: false, foreground: true }}
            >
                {icon}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 45,
        margin: 5,
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

