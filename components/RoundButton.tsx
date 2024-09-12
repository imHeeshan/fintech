import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

type RoundButtonProps = {
    icon: typeof Ionicons.defaultProps
    text: string,
    onPress?: () => void
}
const RoundButton = ({ icon, text, onPress }: RoundButtonProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={defaultStyles.circle}>
                <Ionicons name={icon} size={30} color={Colors.dark} />
            </View>
            <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
    )
}

export default RoundButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 10
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.dark
    }

})