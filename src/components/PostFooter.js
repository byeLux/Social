import {View, Pressable, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import ModerationButton from './ModerationButton';

export default function PostFooter({ isEditing, canDelete, setIsEditing, onDelete, onEdit, id, text }) {
    if (!isEditing) {
        return (
            <View style={styles.postFooter}>
                <ModerationButton 
                    onPressFunctions={() => setIsEditing(true)}
                    icon={<Ionicons name="create" size={24} color="green" />}
                />
                {
                    (canDelete) &&
                    <ModerationButton 
                        onPressFunctions={() => onDelete(id)} 
                        icon={<Ionicons name="trash" size={24} color="red" />}
                    />
                }
            </View>
        );
    }

    return (
        <View style={styles.postFooter}>
            <ModerationButton 
                onPressFunctions={() => setIsEditing(false)}
                icon={<Ionicons name="arrow-back" size={24} color="#202020" />}
            />
            <ModerationButton
                onPressFunctions={() => { onEdit(id, text); setIsEditing(false); }}
                icon={<Ionicons name="save" size={24} color="green" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    postFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
});