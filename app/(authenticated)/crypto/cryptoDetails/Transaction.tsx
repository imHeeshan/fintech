import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptyComponent from '@/components/EmptyComponent'
import { defaultStyles } from '@/constants/Styles'

const Transaction = () => {
    return (
        <View style={defaultStyles.sectionBlock}>
            <EmptyComponent />
        </View>
    )
}

export default Transaction

const styles = StyleSheet.create({})