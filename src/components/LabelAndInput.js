import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function LabelAndInput({label, inputValue, inputOnChangeText, inputPlaceholder, isSecure}) {
    return (
        <View style={[styles.marginBottom, styles.centerElements]}>
            <Text style={[styles.yellowText, {fontSize: 25}]}>{label}</Text>
            <TextInput
                value={inputValue}
                onChangeText={inputOnChangeText}
                placeholder={inputPlaceholder}
                secureTextEntry={isSecure}
                style={styles.textInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    textInput: {
        height: 45,
        width: 250,
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },
    marginBottom: {
        marginBottom: 20,
    },
    centerElements: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});