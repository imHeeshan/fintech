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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserInactivityProvider } from '@/context/UserInactivity';
import Loader from '@/components/Loader'

const queryClient = new QueryClient()
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
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);
  useEffect(() => {
    if (!isLoaded) return;

    console.log(isSignedIn,"out");
    const inAuthGroup = segments[0] === '(authenticated)';
    if (isSignedIn && !inAuthGroup) {
      console.log(isSignedIn);
      
      router.replace('/(authenticated)/(tabs)/crypto');

    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn, isLoaded]);

  if (!loaded || !isLoaded) {
    return <Loader />
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
        options={{
          title: 'Help',
          headerTitleAlign: 'center',
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
      <Stack.Screen name='verify/[phone]'
        options={{
          headerBackTitle: '',
          title: '',
          headerStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons
                name="chevron-back"
                size={26}
                color={Colors.dark} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="(authenticated)/(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(authenticated)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name='chevron-back' size={24} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          headerStyle: { backgroundColor: Colors.background },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <TouchableOpacity>
                <Ionicons name='notifications-outline' size={24} color={Colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='star-outline' size={24} color={Colors.dark} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <Stack.Screen name="(authenticated)/(modals)/lock" options={{ headerShown: false }} />
    </Stack>
  )
}
const RootLayotNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <InitialLayout />
          </GestureHandlerRootView>
        </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default RootLayotNav  