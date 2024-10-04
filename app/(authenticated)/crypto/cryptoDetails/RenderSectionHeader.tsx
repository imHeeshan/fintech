import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

type props = {
    categories: string[],
    activeIndex: number,
    setActiveIndex: (index: number) => void
}
const RenderSectionHeader = ({ categories, activeIndex, setActiveIndex }: props) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'space-between',
                width: "100%",
                paddingHorizontal: 16,
                paddingBottom: 8,
                backgroundColor: Colors.background,
                borderBottomWidth: 2,
                borderBottomColor: 'red'
            }}
        >
            {categories.map((category, index) =>
            (
                <TouchableOpacity
                    onPress={() => setActiveIndex(index)}
                    style={
                        activeIndex === index ? [styles.categoriesBtn, styles.categoriesBtnActive] : styles.categoriesBtn}
                    key={index}>
                    <Text
                        style={activeIndex === index ? [styles.categoryText, styles.categoryTextActive] : styles.categoryText}>
                        {category}
                    </Text>
                </TouchableOpacity>
            )
            )}
        </ScrollView>
    )
}

export default RenderSectionHeader

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 14,
        color: Colors.gray,
    },
    categoryTextActive: {
        color: '#000',
    },
    categoriesBtn: {
        padding: 10,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    categoriesBtnActive: {
        backgroundColor: '#fff',
    },

})