import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { defaultStyles } from '@/constants/Styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const CustomHeader = () => {
    const { top } = useSafeAreaInsets()
    return (
        <BlurView
            intensity={50}
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                paddingTop: top
            }}
            tint='extraLight'
            experimentalBlurMethod='dimezisBlurView'
        >
            <View style={styles.container}>
                <TouchableOpacity style={[defaultStyles.circle, styles.iconCircle, { backgroundColor: Colors.gray }]}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.white }}>MH</Text>
                </TouchableOpacity>
                <View style={styles.searchSection}>
                    <Ionicons name='search' size={20} style={styles.searchIcon} />
                    <TextInput style={styles.input} placeholder='Search'/>
                </View>
                <View style={[defaultStyles.circle, styles.iconCircle]}>
                    <Ionicons name='stats-chart' size={20} color={Colors.dark} />
                </View>
                <View style={[defaultStyles.circle, styles.iconCircle]}>
                    <Ionicons name='card' size={20} color={Colors.dark} />
                </View>
            </View>
        </BlurView>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'transparent'
    },
    iconCircle: {
        height: 40,
        width: 40,
        backgroundColor: Colors.lightGray
    },
    searchSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.lightGray,
        // gap: 10,
        borderRadius: 30
    },
    input: {
        flex: 1,
        // paddingVertical: 10,
        color:Colors.dark
    },
    searchIcon: {
        padding: 10
    }
})