import {View, TextInput, Pressable, Text, StyleSheet, Button} from 'react-native';

export default function Post({id, user_id, role, content, creation_date, onDelete}) {
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Text style={styles.yellowText}>{user_id}</Text>
                <Text style={styles.thinText}>{role}</Text>
            </View>
            <View style={styles.postBody}>
                <Text style={styles.greyText}>{content}</Text>
            </View>
            <View style={styles.postFooter}>
                <Text style={styles.thinText}>{creation_date}</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => {showEdit()}}>
                        <Text>Edit</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => {onDelete(id)}}>
                        <Text>Delete</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 5,
        borderColor: '#5b5b5b',
        borderWidth: 1,
        padding: 5,
        margin: 5,
    },
    postHeader: {
        flex: 1,
        borderWidth: 1,
        borderBottomColor: '#5b5b5b',
    },
    postBody: {
        flex: 2,
    },
    postFooter: {
        flex: 1,
        alignItems: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    thinText: {
        color: '#FFD99F',
        fontWeight: 'thin', 
    },
    yellowText: {
        color: '#FFD99F',
        fontWeight: 'bold', 
    },
    button: {
        marginLeft: 10,
        backgroundColor: '#FFD99F',
    },
    buttonStyle: {
        backgroundColor: '#FFD99F',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#565656',
        fontWeight: 'bold',
    },
    footer: {
        flex: 3,
    },
    greyText: {
        color: '#c8c8c8',
    },
});