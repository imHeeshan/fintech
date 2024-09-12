import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    pillButton: {
        padding: 10,
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 40,
        fontWeight: '700',
    },
    descriptionText: {
        fontSize: 18,
        marginTop: 20,
        color: Colors.gray,
    },
    linkText: {
        color: Colors.lightBlue,
        fontSize: 18,
        fontWeight: '500',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 10,
    },
    circle: {
        width: 60,
        height: 60,
        backgroundColor: Colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
})