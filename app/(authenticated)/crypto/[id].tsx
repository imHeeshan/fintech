import { SafeAreaView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import * as Haptics from 'expo-haptics'
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated'
import RenderSectionHeader from './RenderSectionHeader'
import RenderListHeader from './RenderListHeader'
import Loader from '@/components/Loader'


const categories = ['Overview', 'News', 'Orders', 'Transactions',];
Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
    const { id } = useLocalSearchParams()
    const [activeIndex, setIndex] = useState(0)
    const headerHeight = useHeaderHeight()
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12)
    const [isLoading, setIsLoading] = useState(false)
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
    useEffect(() => {
        if (isActive) {
            Haptics.selectionAsync()
        }
    }, [isActive])

    const { data } = useQuery({
        queryKey: ['currencies', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?id=${id}`).then((res) => res.json())
            return info[+id]
        },
    })
    const { data: tickers } = useQuery({
        queryKey: ['tickers'],
        queryFn: async (): Promise<any[]> => fetch(`/api/tickers`).then((res) => res.json()),
    });

    const animatedPriceText = useAnimatedProps(() => {
        return {
            text: `${state.y.price.value.value.toFixed(2)} €`,
            defaultValue: `${state.y.price.value.value.toFixed(2)} €`
        }
    })
    const animatedDateText = useAnimatedProps(() => {
        const date = new Date(state.x.value.value)
        return {
            text: `${date.toLocaleDateString()}`,
            defaultValue: ''
        }
    })
    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 800);
    }, [id])
    // if (isLoading || data === undefined) { return <Loader /> }

    console.log("data", data);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: headerHeight, }}>
            <Stack.Screen options={{ title: data?.name ? data.name : '' }} />
            <SectionList
                contentInsetAdjustmentBehavior='automatic'
                stickySectionHeadersEnabled={true}
                keyExtractor={(item) => item.title}
                sections={[{ data: [{ title: 'chart' }] }]}
                renderSectionHeader={() =>
                    <RenderSectionHeader
                        categories={categories}
                        activeIndex={activeIndex}
                        setIndex={setIndex}
                    />}
                ListHeaderComponent={() => (
                    <RenderListHeader data={data} />
                )}
                renderItem={() =>
                (
                    <View style={{ flex: 1, }}>
                        <View style={[defaultStyles.sectionBlock, { marginTop: 20, height: 450, }]}>
                            {tickers &&
                                <>
                                    {!isActive &&
                                        <View>
                                            <Text style={{ fontSize: 20, color: Colors.dark, fontWeight: '600' }}>
                                                {tickers[tickers.length - 1].price.toFixed(2)} €</Text>
                                            <Text style={{ fontSize: 13, color: Colors.gray }}>Today</Text>
                                        </View>}
                                    {isActive &&
                                        <View>
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={'transparent'}
                                                style={{ fontSize: 20, color: Colors.dark, fontWeight: '600' }}
                                                animatedProps={animatedPriceText}
                                                defaultValue={animatedPriceText.defaultValue}
                                            />
                                            <AnimatedTextInput
                                                editable={false}
                                                underlineColorAndroid={'transparent'}
                                                style={{ fontSize: 13, color: Colors.gray }}
                                                animatedProps={animatedDateText}
                                            />
                                        </View>}
                                    <CartesianChart
                                        axisOptions={{
                                            font,
                                            tickCount: 10,
                                            labelOffset: { x: -2, y: 0 },
                                            formatYLabel: (v) => `${v} € `,
                                            formatXLabel: (ms) => format(new Date(ms), 'MM/yy')

                                        }}
                                        chartPressState={state}
                                        data={tickers!} xKey="timestamp" yKeys={["price"]}>
                                        {({ points }) => (
                                            <>
                                                <Line points={points.price} color={Colors.primary} strokeWidth={3} />
                                                {isActive && (
                                                    <ToolTip x={state.x.position} y={state.y.price.position} />
                                                )}
                                            </>
                                        )}
                                    </CartesianChart>
                                </>}
                        </View>
                        <View style={[defaultStyles.sectionBlock, { marginVertical: 20, }]}>
                            <Text style={[{ color: Colors.gray }, defaultStyles.subTitle]}>Overview </Text>
                            <Text style={{ color: Colors.gray }}>{data?.description} </Text>
                        </View>
                    </View>
                )
                }
            />
        </SafeAreaView>

    )
}

export default Page

const styles = StyleSheet.create({

})