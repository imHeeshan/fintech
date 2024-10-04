import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
type TProps = {
    percentage: number | 0
}
const CurrencyPercentage = ({ percentage }: TProps) => {
    const checkPercentageValue = percentage > 0
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name={checkPercentageValue ? 'caret-up' : 'caret-down'} size={16}
                color={checkPercentageValue ? Colors.success : Colors.danger} />
            <Text>{percentage.toFixed(2)} %</Text>
        </View>
    )
}

export default CurrencyPercentage

const styles = StyleSheet.create({})