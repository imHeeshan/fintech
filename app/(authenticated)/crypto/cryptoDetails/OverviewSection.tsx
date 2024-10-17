import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { CartesianChart, ChartPressState, Line, useChartPressState } from 'victory-native'
import { Circle, FontSlant, FontWeight, useFont } from '@shopify/react-native-skia'
import Animated, { SharedValue, useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated'
import { priceformatFn, priceFormatLocalFn } from '@/constants/ReusableFn'
import { format } from 'date-fns'
import { ICurrency, Ticker } from '@/interface/crypto'
import * as Haptics from 'expo-haptics'
import RenderHtml from 'react-native-render-html';
import { ICurrencyInfo, IHistoricalTicker, ITickerHistory, IDataPoint } from '@/interface/cryptoInterface'
import { NormalLoader } from '@/components/Loader'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface IOverviewProps {
    tickers: ITickerHistory,
    currencyInfo?: ICurrencyInfo
}
const OverviewSection = ({ tickers, currencyInfo }: IOverviewProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 10)
    const { state, isActive } = useChartPressState({ x: 0, y: { volume: 0 } });
    const { width } = useWindowDimensions();
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollViewRef = useRef()
    function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
        return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
    }
    const volumeData: IDataPoint[] = tickers.total_volumes?.map((item: number[]) => ({
        timestamp: item[0],
        volume: item[1],
    })) || [];
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const scrollX = useSharedValue(0); // Shared value to control scroll position

    // Animated props for the ScrollView
    const animatedProps = useAnimatedProps(() => ({
        contentOffset: {
            x: scrollX.value,
            y: 0, // No vertical scrolling in this case
        },
    }));
    // Update when the X position changes or the state is active

    useEffect(() => {
        if (isActive) {
            Haptics.selectionAsync()
        }
    }, [isActive])

    const animatedPriceText = useAnimatedProps(() => {
        const price = state?.y?.volume?.value?.value || 0
        return {
            text: `$ ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} `,
            defaultValue: ''

        }
    })
    console.log(state.y.volume.value);
    const animatedDateText = useAnimatedProps(() => {
        const date = new Date(state.x.value.value)
        const xPosition = state.x.position.value; // X-axis position in the chart

        scrollX.value = withSpring(xPosition - 100);
        return {
            text: `${date.toLocaleDateString('en-GB')}`,
            defaultValue: ''
        }
    })
    const tagsStyles = {
        span: {
            color: Colors.gray,
            fontSize: 13,
            fontWeight: 500 as 500
        },
        p: {
            color: Colors.gray,
            // lineHeight: 18
            // fontSize:15
        }
    };
    const description = currencyInfo?.description || "No description available.";

    const truncatedDescription = !isExpanded
        ? `${description.slice(0, 200)}... <span>Read more</span>`
        : description;
    if (volumeData?.length === 0 || volumeData == undefined) {
        return <NormalLoader />
    }
    const renderYAxis = () => {
        const yLabels = Array.from({ length: 10 }, (_, i) => i * (Math.max(...volumeData.map(d => d.volume)) / 10)); // Generate Y labels
        return (
            <View style={{ flex: 1 }}>
                {yLabels.map((label, index) => (
                    <Text key={index} style={{ fontSize: 12, color: 'gray' }}>
                        $ {priceformatFn(label)} {/* Format Y-axis labels */}
                    </Text>
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, }}>
            <View style={[defaultStyles.sectionBlock, { marginTop: 20, height: 450, }]}>
                {volumeData.length > 0 &&
                    <>
                        {!isActive &&
                            <View>
                                <Text style={{ fontSize: 20, color: Colors.dark, fontWeight: '600' }}>
                                    $ {priceFormatLocalFn(volumeData[volumeData.length - 1]?.volume)}</Text>
                                <Text style={{ fontSize: 13, color: Colors.gray }}>Today</Text>
                            </View>}
                        {isActive &&
                            <View>
                                <AnimatedTextInput
                                    editable={false}
                                    underlineColorAndroid={'transparent'}
                                    style={{ fontSize: 20, color: Colors.dark, fontWeight: '600' }}
                                    animatedProps={animatedPriceText}
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
                                    tickCount: 7,
                                    labelOffset: { x: 2, y: 5 },
                                    formatYLabel: (v) => {
                                        const formatPrice = priceformatFn(v)
                                        return `${formatPrice} €`
                                    },
                                    formatXLabel: (ms) => `${format(new Date(ms), 'MM/yy')}`
                                }}
                                chartPressState={state}
                                data={volumeData!}
                                xKey="timestamp"
                                yKeys={["volume"]}>
                                {({ points }) => (
                                    <>
                                        <Line points={points.volume} color={Colors.primary} strokeWidth={3} />
                                        {isActive && (
                                            <ToolTip x={state.x.position} y={state.y.volume.position} />
                                        )}
                                    </>
                                )}
                            </CartesianChart>
                    </>
                }
            </View>
            <View style={[defaultStyles.sectionBlock, { marginVertical: 20, gap: 5 }]}>
                <Text style={[{ color: Colors.gray }, defaultStyles.subTitle]}>Overview </Text>
                <TouchableOpacity onPress={toggleExpand} activeOpacity={.6}>
                    <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={width}
                        source={{ html: `<p>${truncatedDescription} </p>` }} // Dynamic content wrapped in <p>

                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OverviewSection

const styles = StyleSheet.create({})