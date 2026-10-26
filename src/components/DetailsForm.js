import { useState } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet } from 'react-native';

export const defaultFields = [
    { name: 'firstName', label: 'NOME', placeholder: 'Nome' },
    { name: 'lastName', label: 'COGNOME', placeholder: 'Cognome' },
    { name: 'username', label: 'USERNAME', placeholder: 'Username' },
    { name: 'email', label: 'EMAIL', placeholder: 'Email' },
];

export default function DetailsForm({ onSave }) {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
    });

    function handleChange(name, text) {
        const newValues = { ...values };
        newValues[name] = text;
        setValues(newValues);
    }

    return (
        <View style={styles.container}>
            <View style={styles.fields}>
                {defaultFields.map((field) => (
                    <View
                        key={field.name}
                        style={styles.field}
                    >
                        <Text style={styles.label}>{field.label}</Text>
                        <TextInput
                            accessibilityLabel={field.label}
                            value={values[field.name]}
                            onChangeText={(text) => handleChange(field.name, text)}
                            placeholder={field.placeholder}
                            placeholderTextColor="#565656"
                            style={styles.input}
                        />
                    </View>
                ))}
            </View>
            <Pressable
                accessibilityRole="button"
                onPress={() => {
                    if (onSave) {
                        onSave(values);
                    }
                }}
                style={styles.button}
                android_ripple={{ color: '#ff4800', foreground: true }}
            >
                <Text style={styles.buttonText}>SALVA</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 640,
        backgroundColor: '#202020',
        borderColor: '#5b5b5b',
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
    },
    fields: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        columnGap: 16,
    },
    field: {
        width: 260,
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        width: 82,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFD99F',
    },
    input: {
        flex: 1,
        minWidth: 0,
        height: 36,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontSize: 14,
        color: '#202020',
        backgroundColor: '#cfcfcf',
        borderRadius: 5,
    },
    button: {
        width: '100%',
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonText: {
        color: '#565656',
        fontWeight: 'bold',
    },
});
