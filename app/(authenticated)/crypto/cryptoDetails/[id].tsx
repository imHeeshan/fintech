import { ActivityIndicator, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from '@shopify/react-native-skia'
import { format } from 'date-fns'
import * as Haptics from 'expo-haptics'
import Animated, { SharedValue, useAnimatedProps, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RenderSectionHeader from './RenderSectionHeader'
import RenderListHeader from './RenderListHeader'
import { formatPriceFn } from '@/constants/ReusableFn'
import RenderNewsSection from './RenderNewsSection'
import { NormalLoader } from '@/components/Loader'
import { Ionicons } from '@expo/vector-icons'
import CurrencyPercentage from '@/components/CurrencyPercentage'
import Orders from './Orders'
import Transaction from './Transaction'


const categories = ['Overview', 'News', 'Orders', 'Transactions',];
Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Page = () => {
    const { id } = useLocalSearchParams()
    const [activeIndex, setActiveIndex] = useState(0)
    const headerHeight = useHeaderHeight()
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 10)
    const [isLoading, setIsLoading] = useState(false)
    const { state, isActive } = useChartPressState({ x: 0, y: { volume: 0 } });
    const router = useRouter()
    const scrollY = useSharedValue(0); // Using shared value for better performance

    const handleScroll = (event) => {
        scrollY.value = event.nativeEvent.contentOffset.y; // Update scroll value
    };

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = withTiming(scrollY.value > 30 ? 1 : 0, { duration: 300 });
        return {
            opacity,
        };
    });

    const animatedViewStyle = useAnimatedStyle(() => {
        const opacity = withTiming(scrollY.value > 40 ? 1 : 0, { duration: 300 });
        return {
            opacity,
        };
    });
    useEffect(() => {
        if (isActive) {
            Haptics.selectionAsync()
        }
    }, [isActive])

    const { data: currencyInfo } = useQuery({
        queryKey: ['currencyInfo', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json())
            return info[+id]
        },
        enabled: !!id
    })
    const { data: currency } = useQuery({
        queryKey: ['currency', id],
        queryFn: async () => {
            const response = await fetch(`/api/listings?id=${id}`);
            return response.json()
        },
        enabled: !!id
    })

    const [symbol, setSymbol] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    useEffect(() => {
        if (currencyInfo) {
            setSymbol(currencyInfo?.symbol)
            setSlug(currencyInfo?.slug)
        }
    }, [currencyInfo])

    const { data: tickers } = useQuery({
        queryKey: ['tickers', currencyInfo],
        queryFn: async () => {
            const response = await fetch(`/api/tickers?symbol=${symbol}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        },
        enabled: !!symbol
    });
    const { data: news } = useQuery({
        queryKey: ['news', currencyInfo],
        queryFn: async () => {
            const response = await fetch(`/api/news?slug=${slug}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        },
        enabled: !!slug && activeIndex === 1
    });
    const animatedPriceText = useAnimatedProps(() => {
        return {
            text: `${state.y.volume.value.value?.toFixed(2)} €`,
            defaultValue: `${state.y.volume.value.value?.toFixed(2)} €`
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

    if (tickers?.length === 0 || tickers == undefined) {
        return <NormalLoader />
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: headerHeight, }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <View style={{ alignItems: 'center' }}>
                            <Animated.Text style={[defaultStyles.subTitle, animatedTextStyle]}>
                                {currencyInfo?.name ? currencyInfo.name : ''}</Animated.Text>
                            <Animated.View style={[{ flexDirection: 'row', alignItems: 'center' }, animatedViewStyle]}>
                                <Text>
                                    {currencyInfo?.symbol ? currencyInfo.symbol : ''}
                                </Text>
                                <CurrencyPercentage percentage={currency?.quote?.EUR?.percent_change_1h} />
                            </Animated.View>
                        </View>
                    ),
                    headerBackVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name='chevron-back' size={24} color={Colors.dark} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <SectionList
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior='automatic'
                stickySectionHeadersEnabled={true}
                keyExtractor={(item) => item.title}
                onScroll={handleScroll}
                sections={[{ data: [{ title: 'chart' }] }]}
                renderSectionHeader={() =>
                    <RenderSectionHeader
                        categories={categories}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />}
                ListHeaderComponent={() => (
                    <RenderListHeader data={currencyInfo} />
                )}
                renderItem={() => {
                    const pointWidth = 3; // Width per data point

                    const chartWidth = tickers?.length * pointWidth;
                    return (
                        <>
                            {activeIndex === 0 ? <View style={{ flex: 1, }}>
                                <View style={[defaultStyles.sectionBlock, { marginTop: 20, height: 450, }]}>
                                    {tickers &&
                                        <>
                                            {!isActive &&
                                                <View>
                                                    <Text style={{ fontSize: 20, color: Colors.dark, fontWeight: '600' }}>
                                                        {tickers[tickers.length - 1]?.volume?.toFixed(2)} €</Text>
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
                                            <View style={{ flex: 1 }}>
                                                <CartesianChart
                                                    axisOptions={{
                                                        font,
                                                        tickCount: 8,
                                                        labelOffset: { x: 2, y: 5 },
                                                        formatYLabel: (v) => {
                                                            const formatPrice = formatPriceFn(v)
                                                            return `${formatPrice} €`
                                                        },
                                                        formatXLabel: (ms) => `${format(new Date(ms), 'MM/yy')}`
                                                    }}
                                                    chartPressState={state}
                                                    data={tickers!} xKey="timestamp" yKeys={["volume"]}>
                                                    {({ points }) => (
                                                        <>
                                                            <Line points={points.volume} color={Colors.primary} strokeWidth={3} />
                                                            {isActive && (
                                                                <ToolTip x={state.x.position} y={state.y.volume.position} />
                                                            )}
                                                        </>
                                                    )}
                                                </CartesianChart>

                                            </View>

                                        </>}
                                </View>
                                <View style={[defaultStyles.sectionBlock, { marginVertical: 20, }]}>
                                    <Text style={[{ color: Colors.gray }, defaultStyles.subTitle]}>Overview </Text>
                                    <Text style={{ color: Colors.gray, lineHeight: 18 }}>{currencyInfo?.description} </Text>
                                </View>
                            </View> : activeIndex === 1 ? <RenderNewsSection data={news} /> :
                                activeIndex === 2 ? <Orders /> : activeIndex === 3 ? <Transaction /> : null}
                        </>
                    )
                }

                }
            />

        </SafeAreaView>

    )
}

export default Page

const styles = StyleSheet.create({
    animatedText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
})