import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EmptyComponent from '@/components/EmptyComponent'
import { defaultStyles } from '@/constants/Styles'

const Orders = () => {
    return (
        <View style={defaultStyles.sectionBlock}>
            <EmptyComponent emptyTxt={"No orders yet..."}/>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({})