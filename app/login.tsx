import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo'


enum SignInType {
  Phone, Google, Email, Apple
}

const Page = () => {
  const [countryCode, setCountryCode] = useState("+94")
  const [mobileNumber, setMobileNumber] = useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  const keyboardbehavior = Platform.OS === 'ios' ? 'padding' : undefined
  const { signIn } = useSignIn()
  const router = useRouter()

  const handleOnSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      const fullMobileNum = `${countryCode}${mobileNumber}`
      try {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullMobileNum
        });
        const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
          return factor.strategy === 'phone_code'
        })
        const { phoneNumberId } = firstPhoneFactor;
        router.push({ pathname: '/verify[phone]', params: { phone: fullMobileNum } });
        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId
        });
        router.push({ pathname: '/verify[phone]', params: { phone: fullMobileNum, signin: 'true' } })
      } catch (error) {
        console.log('error', JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', error.errors[0].message)
          }
        }
      }
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardbehavior} keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={[defaultStyles.headerTxt, {}]}>Welcome back!</Text>
        <Text style={[defaultStyles.descriptionTxt, {}]}>Enter your mobile number associated with your account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        <TouchableOpacity style={[defaultStyles.pillButton, { backgroundColor: mobileNumber !== '' ? Colors.primary : Colors.primaryMuted }]}
          onPress={() => handleOnSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonTxt}>Continue</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginVertical: 20 }}>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
          />
        </View>
        <TouchableOpacity style={[defaultStyles.pillButton, styles.button]}
          onPress={() => handleOnSignIn(SignInType.Email)}>
          <Ionicons name="mail" size={26} color={Colors.dark} />
          <Text style={[defaultStyles.buttonTxt, { color: Colors.dark }]}>Continue with email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.pillButton, styles.button]}
          onPress={() => handleOnSignIn(SignInType.Google)}>
          <Ionicons name="logo-google" size={26} color={Colors.dark} />
          <Text style={[defaultStyles.buttonTxt, { color: Colors.dark }]}>Continue with google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[defaultStyles.pillButton, styles.button]}
          onPress={() => handleOnSignIn(SignInType.Apple)}>
          <Ionicons name="logo-apple" size={26} color={Colors.dark} />
          <Text style={[defaultStyles.buttonTxt, { color: Colors.dark }]}>Continue with apple</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row'
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    gap: 16, marginTop: 20
  }
})