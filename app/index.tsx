import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAssets } from 'expo-asset'
import { ResizeMode, Video } from 'expo-av'
import { Link } from 'expo-router'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/units/units'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro.mp4')])
  return (
    <View style={styles.container}>
      {assets && <Video
        shouldPlay
        isMuted
        isLooping
        resizeMode={ResizeMode.COVER}
        source={{ uri: assets[0].uri }} style={styles.video} />}

      <View style={{ marginTop: 60, padding: 20 }}>
        <Text style={styles.header}>Ready To start an App ?</Text>
      </View>
      <View style={styles.buttons}>
        <Link href={'/login'}
          asChild
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}>
          <TouchableOpacity>
            <Text style={[styles.btn_txt,{}]}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link href={'/signup'}
          asChild
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.white }]}>
          <TouchableOpacity>
            <Text style={[styles.btn_txt,{color:Colors.dark}]}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute'
  },
  header: {
    color: "#fff",
    fontSize: 36,
    textTransform: 'uppercase',
    fontWeight: '900'
  },
  button: {
    backgroundColor: 'red',
    flex: 1
  },
  btn_txt: {
    color: "#fff",
    fontWeight: '500',
    fontSize: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
    paddingHorizontal: 30,
    gap: 20,
  }
})