import { StyleSheet, ViewStyle } from "react-native";
import Colors from "./Colors";

const circle: ViewStyle = {
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
};
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
    pillButtonSmall: {
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerTxt: {
        fontSize: 40,
        fontWeight: '700',
    },
    descriptionTxt: {
        fontSize: 18,
        marginTop: 20,
        color: Colors.gray,
    },
    linkTxt: {
        color: Colors.lightBlue,
        fontSize: 18,
        fontWeight: '500',
    },
    buttonTxt: {
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
        ...circle,
    },
    smallCircle: {
        width: 40,
        height: 40,
        ...circle,
    },
    sectionBlock: {
        marginHorizontal: 20,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        gap: 20,
    },
    subTitle: {
        color: Colors.gray,
        fontWeight: '600',
        fontSize: 20,
        // margin: 14,
    },
    smallTitleTxt: {
        color: Colors.gray,
        fontWeight: '600',
        fontSize: 12,
    },
    smallSubTxt: {
        color: Colors.gray,
        fontSize: 11,
        fontWeight: '600',
    },
    emptyTxt: {
        color: Colors.gray,
        padding: 14, fontWeight: '400'
    },
    flexRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})