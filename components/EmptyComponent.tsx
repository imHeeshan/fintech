import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
type TPorps = {
    emptyTxt?: string
}
const EmptyComponent = ({ emptyTxt = "No transaction yet..." }: TPorps) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={defaultStyles.emptyTxt}>{emptyTxt}</Text>
        </View>
    )
}

export default EmptyComponent

const styles = StyleSheet.create({})