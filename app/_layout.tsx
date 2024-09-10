import { useFonts } from 'expo-font';
import { Link, router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <StatusBar style='light' />
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
      </Stack>
    </GestureHandlerRootView>

  );
}
