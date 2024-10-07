import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { CartesianChart, ChartPressState, Line, useChartPressState } from 'victory-native'
import { Circle, useFont } from '@shopify/react-native-skia'
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated'
import { formatPriceFn } from '@/constants/ReusableFn'
import { format } from 'date-fns'
import { CurrencyInfo, ICurrency, Ticker } from '@/interface/crypto'
import * as Haptics from 'expo-haptics'

Animated.addWhitelistedNativeProps({ text: true })
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const OverviewSection = ({ tickers, currencyInfo }: { tickers: Ticker[], currencyInfo: CurrencyInfo }) => {

    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 10)
    const { state, isActive } = useChartPressState({ x: 0, y: { volume: 0 } });

    useEffect(() => {
        if (isActive) {
            Haptics.selectionAsync()
        }
    }, [isActive])

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

    return (
        <View style={{ flex: 1, }}>
            <View style={[defaultStyles.sectionBlock, { marginTop: 20, height: 450, }]}>
                { }
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
                                data={tickers!}
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

                        </View>

                    </>}
            </View>
            <View style={[defaultStyles.sectionBlock, { marginVertical: 20, }]}>
                <Text style={[{ color: Colors.gray }, defaultStyles.subTitle]}>Overview </Text>
                <Text style={{ color: Colors.gray, lineHeight: 18 }}>{currencyInfo?.description} </Text>
            </View>
        </View>
    )
}

export default OverviewSection

const styles = StyleSheet.create({})