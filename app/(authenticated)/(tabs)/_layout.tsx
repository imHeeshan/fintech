import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import CustomHeader from '@/components/CustomHeader'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.lightBlue,

                tabBarBackground: () =>
                    <BlurView
                        intensity={50}
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            flex: 1
                        }}
                        tint='extraLight'
                        experimentalBlurMethod='dimezisBlurView'
                    />,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    borderTopWidth: 0

                }
            }}

        >
            <Tabs.Screen name='home'
                options={{
                    title: "Home",
                    tabBarIcon: ({ size, color }) =>
                        <Entypo name="qq" size={size} color={color} />,
                    header: () => <CustomHeader />,
                    headerTransparent: true
                }} />
            <Tabs.Screen name='invest'
                options={{
                    title: "Invest",
                    tabBarIcon: ({ size, color }) =>
                        <FontAwesome name='line-chart' size={size} color={color} />
                }} />
            <Tabs.Screen name='transfers'
                options={{
                    title: "Transfers",
                    tabBarIcon: ({ size, color }) =>
                        <FontAwesome name='exchange' size={size} color={color} />
                }} />
            <Tabs.Screen name='crypto'
                options={{
                    title: "Crypto",
                    tabBarIcon: ({ size, color }) =>
                        <FontAwesome name='bitcoin' size={size} color={color} />
                }} />
            <Tabs.Screen name='lifestyle'
                options={{
                    title: "Lifestyle",
                    tabBarIcon: ({ size, color }) =>
                        <FontAwesome name='th' size={size} color={color} />
                }} />
        </Tabs>
    )
}

export default Layout

const styles = StyleSheet.create({})