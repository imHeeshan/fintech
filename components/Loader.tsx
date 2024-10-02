import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    useDerivedValue,
} from 'react-native-reanimated';

export default function Loader() {
    const scale = useSharedValue<number>(1);
    const scaleStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));


    React.useEffect(() => {
        const animateScale = () => {
            scale.value = withRepeat(
                withTiming(2, { duration: 1000 }),
                -1,
                true
            );
        };

        scale.value = 1; // Reset to initial scale
        animateScale();

        // Cleanup function to cancel the animation on unmount
        return () => {
            scale.value = 1; // Reset scale on unmount
        };
    }, []);




    return (
        <View style={styles.container}>
            <Animated.View style={[styles.ball, scaleStyles]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        flexDirection: 'row',
    },
    ball: {
        height: 25,
        width: 25,
        backgroundColor: Colors.primaryMuted,
        borderRadius: 25,
        shadowColor: '#FFFFF0',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.58,

        shadowRadius: 16.00,
        
        elevation: 10,
    },

});
