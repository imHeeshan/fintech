import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const TrustLevel = ({ trustScore }: { trustScore: number | 0 }) => {
    enum trustLvlKey {
        High,
        Moderate,
        Low
    }
    const score = trustScore ?? 0;

    const trustLvl =
        score > 7.5 ? trustLvlKey.High : score > 5 ? trustLvlKey.Moderate : score > 0 && score < 5 ? trustLvlKey.Low : null
    return (
        <View style={{
            backgroundColor: trustLvl === trustLvlKey.High ?
                Colors.success : trustLvl === trustLvlKey.Moderate ?
                    Colors.warning : trustLvl === trustLvlKey.Low ? Colors.danger : Colors.gray
            , width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 4, paddingVertical: 2
        }}>
            <Text style={{ color: Colors.white, fontWeight: '600' }}>{trustLvl !== null ? trustLvlKey[trustLvl] : 'Unknown'}
            </Text>
        </View>
    )
}

export default TrustLevel

const styles = StyleSheet.create({})