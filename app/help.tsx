import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'

const Page = () => {
  return (
    <SafeAreaView style={[{flex:1,backgroundColor:'red',alignItems:'center',justifyContent:'center'},defaultStyles.container]}>
    
      <Text>help</Text>
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({})