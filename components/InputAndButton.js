import {View, TextInput, Button } from 'react-native';

export function InputAndButton({inputLabel, buttonLabel, ...props}) {
    return (
        <View>
            <TextInput></TextInput>
            <Button>
                <Text></Text>
            </Button>
        </View>
    )
}