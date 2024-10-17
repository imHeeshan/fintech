import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'
import { defaultStyles } from '@/constants/Styles'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '@/constants/Colors'
const CELL_COUNT = 6;

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();
    const [code, setCode] = useState('')
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    useEffect(() => {
        if (code.length === 6) {
            console.log('code ', code);

            if (signin === 'true') {
                verifySignIn()
            }
            else {
                verifyCode()
            }
        }
    }, [code])

    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({
                code,
            });
            await setActive!({ session: signUp!.createdSessionId })
        } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                if (error.errors[0].code === 'form_identifier_not_found') {
                    Alert.alert('Error', error.errors[0].message)
                }
            }
        }
    }
    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });
            await setActive!({ session: signIn!.createdSessionId })
        } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
            if (isClerkAPIResponseError(error)) {
                if (error.errors[0].code === 'form_identifier_not_found') {
                    Alert.alert('Error', error.errors[0].message)
                }
            }
        }
    }

    return (
        <View style={defaultStyles.container}>
            <Text style={[defaultStyles.headerTxt]}>6-digit code</Text>
            <Text style={[defaultStyles.descriptionTxt]}>Code send to {phone} unless you already have an account</Text>

            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <Link href={'/login'} asChild replace>
                <TouchableOpacity>
                    <Text style={[defaultStyles.linkTxt,]}>Already have an account? Login </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 50,
        height: 50,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: Colors.lightGray, borderRadius: 8,
        padding: 10
    },
    focusCell: {
        borderColor: Colors.primaryMuted,
        borderWidth: 2
    },
})