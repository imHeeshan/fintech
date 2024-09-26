import { useAuth } from "@clerk/clerk-expo"
import { Href, useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { AppState, AppStateStatus } from "react-native"
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV(
    {
        id: "inactivity-storage"
    }
)
export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState)
    const router = useRouter()
    const { isSignedIn } = useAuth()
    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove()
        }
    }, [isSignedIn])

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
     
        if (nextAppState === 'background') {
            recordStartedTime()
        } else if (nextAppState === 'active' && appState.current.match(/background/)) {
            const elapsed = Date.now() - (storage.getNumber('startTime') || 0)
            console.log(elapsed);
            if (elapsed > 500 && isSignedIn) {
                console.log("hai");
                router.replace('/(authenticated)/(modals)/lock')
            }
        }
        appState.current = nextAppState;
    }

    const recordStartedTime = async () => {
        const date = new Date()
        storage.set("startTime", Date.now())
    }

    return children
}