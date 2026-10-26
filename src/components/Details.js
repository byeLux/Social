import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModerationButton from './ModerationButton';
import { defaultFields } from './DetailsForm';
import { capitalize } from '../utils/stringUtils';

export default function Details({
    id,
    firstName,
    lastName,
    username,
    email,
    authorUsername,
    role,
    creation_date,
    itsMe,
    viewerRole,
    onEdit,
    onDelete,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState({ firstName, lastName, username, email });
    const canEdit = viewerRole === 'mod' || viewerRole === 'admin';
    const canDelete = viewerRole === 'admin';
    const details = { firstName, lastName, username, email };
    const date = new Date(creation_date);

    function handleChange(name, text) {
        const newValues = { ...values };
        newValues[name] = text;
        setValues(newValues);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>
                    {capitalize(authorUsername || username)}{itsMe && ' (You)'}
                </Text>
                <Text style={role === 'user' ? styles.userRole : styles.adminRole}>{role}</Text>
            </View>
            <View style={styles.body}>
                {defaultFields.map((field) => (
                    <View key={field.name} style={styles.field}>
                        <Text style={styles.label}>{field.label}</Text>
                        {isEditing && canEdit ? (
                            <TextInput
                                accessibilityLabel={field.label}
                                value={values[field.name]}
                                onChangeText={(text) => handleChange(field.name, text)}
                                style={styles.input}
                            />
                        ) : (
                            <Text style={styles.value}>{details[field.name]}</Text>
                        )}
                    </View>
                ))}
            </View>
            <Text style={styles.date}>{date.toLocaleString()}</Text>
            {canEdit && (
                <View style={styles.footer}>
                    {isEditing ? (
                        <>
                            <ModerationButton
                                onPressFunctions={() => setIsEditing(false)}
                                icon={<Ionicons name="arrow-back" size={24} color="#202020" />}
                            />
                            <ModerationButton
                                onPressFunctions={async () => {
                                    if (onEdit) {
                                        const result = await onEdit(id, values);
                                        if (result !== false) {
                                            setIsEditing(false);
                                        }
                                    }
                                }}
                                icon={<Ionicons name="save" size={24} color="green" />}
                            />
                        </>
                    ) : (
                        <ModerationButton
                            onPressFunctions={() => {
                                setValues({ firstName, lastName, username, email });
                                setIsEditing(true);
                            }}
                            icon={<Ionicons name="create" size={24} color="green" />}
                        />
                    )}
                    {canDelete && (
                        <ModerationButton
                            onPressFunctions={() => {
                                if (onDelete) {
                                    onDelete(id);
                                }
                            }}
                            icon={<Ionicons name="trash" size={24} color="red" />}
                        />
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        borderRadius: 5,
        borderColor: '#5b5b5b',
        borderWidth: 1,
        padding: 10,
        margin: 5,
    },
    header: {
        borderBottomColor: '#5b5b5b',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    username: {
        color: '#FFD99F',
        fontWeight: 'bold',
        fontSize: 17,
    },
    userRole: {
        color: '#b6ff49',
    },
    adminRole: {
        color: '#ff00e6',
    },
    body: {
        paddingTop: 10,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 82,
        color: '#FFD99F',
        fontWeight: 'bold',
        fontSize: 12,
    },
    value: {
        flex: 1,
        color: '#c8c8c8',
        fontSize: 14,
    },
    input: {
        flex: 1,
        minWidth: 0,
        height: 36,
        paddingHorizontal: 10,
        paddingVertical: 0,
        borderRadius: 5,
        backgroundColor: '#5b5b5b',
        color: '#d9d9d9',
        fontSize: 14,
    },
    date: {
        color: '#FFD99F',
        textAlign: 'right',
        fontSize: 12,
        paddingBottom: 5,
    },
    footer: {
        borderTopColor: '#5b5b5b',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
    },
});
