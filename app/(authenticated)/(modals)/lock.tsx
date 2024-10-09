import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';

const Page = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the device supports biometric authentication
    const checkDeviceForHardware = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    checkDeviceForHardware();
  }, []);
  const router = useRouter()
  const handleAuthentication = async () => {
    try {
      // Check if biometrics are enrolled (e.g., fingerprints or face ID)
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      if (!biometricRecords) {
        return Alert.alert('Biometric record not found', 'Please enroll biometric authentication on your device.');
      }

      // Prompt the user for authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to unlock',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,  // Allow using PIN/Passcode if biometrics fail
      });
console.log(result);

      if (result.success) {
        setAuthenticated(true);
        router.replace('/(authenticated)/(tabs)/home')
      } else {
        Alert.alert('Failed', 'Authentication failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleAuthentication()
  }, [])

  return (
    <View style={styles.container}>
      {!authenticated && (
        <View style={styles.authContainer}>
          <Text style={styles.authText}>
            {isBiometricSupported
              ? 'Biometric Authentication is available'
              : 'Your device does not support Biometrics'}
          </Text>
          <TouchableOpacity onPress={handleAuthentication}>
            <Entypo name="fingerprint" size={60} color={Colors.primaryMuted} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  authContainer: {
    alignItems: 'center',
  },
  authText: {
    fontSize: 18,
    marginBottom: 20,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Page;
