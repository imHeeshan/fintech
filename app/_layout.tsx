import { useFonts } from 'expo-font';
import { Link, router, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
import * as SecureStore from 'expo-secure-store'
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
const InitialLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    console.log(isSignedIn);

    if (!isLoaded) return;
    const inAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.lightBlue} />
      </View>)
  }
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='login'
        options={{
          headerBackTitle: '',
          title: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="chevron-back" size={26} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={'/help'} asChild>
              <TouchableOpacity >
                <Ionicons name="help-circle-outline" size={26} color={Colors.dark} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen name='signup'
        options={{
          headerBackTitle: '',
          title: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="chevron-back" size={26} color={Colors.dark} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="help"
        options={{ title: 'Help', headerTitleAlign: 'center', presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name='verify/[phone]'
        options={{
          headerBackTitle: '',
          title: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="chevron-back" size={26} color={Colors.dark} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
const RootLayotNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default RootLayotNav