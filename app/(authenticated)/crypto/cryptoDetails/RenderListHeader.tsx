import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Currency, Ticker } from '@/interface/crypto'

const RenderListHeader = ({ data }: any) => {
    return (
        <View style={{ marginHorizontal: 16 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16,
                paddingVertical:5
            }}>
                <View style={[defaultStyles.flexRowView,{gap:5}]}>
                    <Text style={[defaultStyles.subTitle,{color:Colors.dark,fontSize:22}]}>{data?.name}</Text>
                    <Text style={[defaultStyles.subTitle,{fontSize:18}]}>{data?.symbol}</Text>
                </View>
                <Image source={{ uri: data?.logo }} style={{ width: 40, height: 40, borderRadius: 40 }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 16, margin: 12 }}>
                <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primary, }]}>
                    <Ionicons name='add' size={24} color={Colors.white} />
                    <Text style={[defaultStyles.buttonTxt]}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primaryMuted, }]}>
                    <Ionicons name='arrow-back' size={24} color={Colors.primary} />
                    <Text style={[defaultStyles.buttonTxt, { color: Colors.primary }]}>Receive</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RenderListHeader

const styles = StyleSheet.create({})