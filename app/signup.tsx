import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'

const Page = () => {
  const [countryCode, setCountryCode] = useState("+94")
  const [mobileNumber, setMobileNumber] = useState('')
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  const keyboardbehavior = Platform.OS === 'ios' ? 'padding' : undefined
  const router = useRouter()
  const { signUp } = useSignUp()
  const handleSignUp = async () => {
    
    const fullMobileNum = `+15555550160`
    // const fullMobileNum = `${countryCode}${mobileNumber}`
  
    try {
      console.log("full phone number" ,fullMobileNum);
      await signUp!.create({
        phoneNumber: fullMobileNum
      });
      signUp!.preparePhoneNumberVerification();
      router.push({ pathname: '/verify/[phone]', params: { phone: fullMobileNum } })
    } catch (error) {

    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardbehavior} keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={[defaultStyles.headerText, {}]}>Let's get started!</Text>
        <Text style={[defaultStyles.descriptionText, {}]}>Enter your mobile number.we will send confirmation number.</Text>
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
        <Link href={'/login'} asChild replace>
          <TouchableOpacity>
            <Text style={[defaultStyles.linkText,]}>Already have an account? Login </Text>
          </TouchableOpacity>
        </Link>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          disabled={mobileNumber !== '' ? false : true}
          onPress={handleSignUp}
          style={[defaultStyles.pillButton, { backgroundColor: mobileNumber !== '' ? Colors.primary : Colors.primaryMuted, }]}>
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
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
  }
})