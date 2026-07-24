import {View, TextInput, Text, StyleSheet} from 'react-native';

export default function LabelAndInput({label, inputValue, inputOnChangeText, inputPlaceholder, isSecure}) {
    return (
        <View>
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
        textAlign: 'center',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },

});