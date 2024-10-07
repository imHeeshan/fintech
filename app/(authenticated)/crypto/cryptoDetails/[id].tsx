import { SafeAreaView, SectionList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { useQuery } from '@tanstack/react-query'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import RenderSectionHeader from './RenderSectionHeader'
import RenderListHeader from './RenderListHeader'
import NewsSection from './NewsSection'
import { NormalLoader } from '@/components/Loader'
import { Ionicons } from '@expo/vector-icons'
import CurrencyPercentage from '@/components/CurrencyPercentage'
import Markets from './Markets'
import Transaction from './Transaction'
import OverviewSection from './OverviewSection'


const categories = ['Overview', 'News', 'Markets', 'Transactions',];

const Page = () => {
    const { id } = useLocalSearchParams()
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [symbol, setSymbol] = useState<string>("")
    const [slug, setSlug] = useState<string>("")

    const headerHeight = useHeaderHeight()
    const router = useRouter()
    const scrollY = useSharedValue(0);

    const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        scrollY.value = event.nativeEvent.contentOffset.y;
    };

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = withTiming(scrollY.value > 30 ? 1 : 0, { duration: 300 });
        return {
            opacity,
        };
    });

    const animatedViewStyle = useAnimatedStyle(() => {
        const opacity = withTiming(scrollY.value > 40 ? 1 : 0, { duration: 300 });
        const display = withTiming(scrollY.value > 40 ? "flex" : "none", { duration: 300 });
        return {
            opacity,
            display,
        };
    });

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

    useEffect(() => {
        if (currencyInfo) {
            setSymbol(currencyInfo?.symbol)
            setSlug(currencyInfo?.slug)
        }
    }, [currencyInfo])

    if (tickers?.length === 0 || tickers == undefined) {
        return <NormalLoader />
    }

    const renderSection = () => {
        switch (activeIndex) {
            case 0:
                return <OverviewSection tickers={tickers} currencyInfo={currencyInfo} />;
            case 1:
                return <NewsSection data={news} />;
            case 2:
                return <Markets />;
            case 3:
                return <Transaction />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: headerHeight, }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                        <View style={{ alignItems: 'center' }}>
                            <Animated.Text style={[styles.animatedText, animatedTextStyle]}>
                                {currencyInfo?.name ? currencyInfo.name : ''}</Animated.Text>
                            <Animated.View style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                                animatedViewStyle]}>
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
                    return (
                        <>{renderSection()}</>
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
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "600",
        color: Colors.dark
    },
})