import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { IExchanges, IMarket, IRootMarket } from '@/interface/crypto';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import TrustLevel from '@/components/TrustLevel';
import { format } from 'date-fns';
import { priceFormatLocalFn } from '@/constants/ReusableFn';
import { NormalLoader } from '@/components/Loader';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

interface Iprops {
  slug: string,
  activeIndex: number,
  currencyName: string
}
const tblTitle = ["#", "Exchange", "Pair", "Price", "Volume (24h)", "Volume %", "Confidence", "Updated"]
const MarketSection = ({ slug, activeIndex, currencyName }: Iprops) => {
  const scrollX = useSharedValue(0);

  const { data: markets, isFetching } = useQuery<IMarket[]>({
    queryKey: ['markets', slug],
    queryFn: async () => {
      const response = await fetch(`/api/markets?slug=${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!slug && activeIndex === 2,
    placeholderData: []
  });

  const { data: exchangesInfo } = useQuery<IExchanges[]>({
    queryKey: ['exchangesInfo', slug],
    queryFn: async () => {
      const response = await fetch(`/api/exchanges`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!slug && activeIndex === 2,
    placeholderData: [],

  });

  const [scrollXValue, setScrollXValue] = useState(0)
  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {

    scrollX.value = event.nativeEvent.contentOffset.x;
    setScrollXValue(event.nativeEvent.contentOffset.x)
  };
  const animatedViewStyle = useAnimatedStyle(() => {
    const width = withTiming(scrollX.value > 15 ? 50 : 110, { duration: 300 });
    return {
      // opacity,
      width,
    };
  });
  // if (isFetching) {
  //   return <NormalLoader />
  // }
  return (
    <View style={[defaultStyles.sectionBlock,{marginBottom:20}]}>
      <Text style={[defaultStyles.subTitle,
      { color: Colors.dark }]}>{currencyName} Markets</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{}}>
          <View style={styles.tableRow}>
            {tblTitle.slice(0, 2).map((title, index) => (
              <Animated.View key={index}
                style={[index === 0 ? styles.indexCol : styles.tableColHeader && animatedViewStyle,{alignItems:'center'}]}>
                <Text
                  style={styles.tableHeaderTxt}>
                  {index === 0 ? title : scrollXValue > 15 ?
                   <FontAwesome name='exchange' size={16} /> : title}

                </Text>
              </Animated.View>
            ))}
          </View>
          {markets?.map((market, index) => {
            const exchanges = exchangesInfo?.find(exchange =>
              exchange.name?.toLowerCase() === market.market?.name.toLowerCase());
            return (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.indexCol]}>
                  <Text style={styles.indexTxt}>{index + 1}</Text>
                </View>
                <Animated.View style={[styles.tableCol,
                defaultStyles.flexRowView,animatedViewStyle, { gap: 5, paddingHorizontal: 5 }]}>
                  <Image source={{ uri: exchanges?.image ?? "" }} style={styles.logo} />
                  {scrollXValue<15&&
                    <Text style={[styles.tableTxt, { fontWeight: '600' }]}
                      numberOfLines={2}>
                      {market.market?.name}
                    </Text>}
                </Animated.View>
              </View>
            )
          })}
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onScroll={handleScroll}>
          <View>
            <View style={styles.tableRow}>
              {tblTitle.slice(2).map((title, index) => (
                <View key={index} style={styles.tableColHeader}>
                  <Text
                    style={styles.tableHeaderTxt}>
                    {title}
                  </Text>
                </View>
              ))}
            </View>
            {markets?.map((market, index) => {
              const exchanges = exchangesInfo?.find(exchange =>
                exchange.name?.toLowerCase() === market.market?.name.toLowerCase());

              const totalVolume = markets.reduce((acc, market) => acc + market.volume, 0);
              const volumePercentage = totalVolume > 0 ? ((market.volume / totalVolume) * 100).toFixed(2) : 0;
              return (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCol,]}>
                    <Text style={[styles.tableTxt, { fontWeight: '600', color: Colors.lightBlue }]} numberOfLines={2}>
                      {market.base}/{market.target}</Text>
                  </View>
                  <View style={[styles.tableCol,]}>
                    <Text style={styles.tableTxt} numberOfLines={2}>
                      {market.last} €</Text>
                  </View>

                  <View style={[styles.tableCol,]}>
                    <Text style={styles.tableTxt} numberOfLines={2}>
                      {priceFormatLocalFn(market.volume)} €
                    </Text>
                  </View>
                  <View style={[styles.tableCol,]}>
                    <Text style={styles.tableTxt} numberOfLines={2}>
                      {volumePercentage} %
                    </Text>
                  </View>
                  <View style={[styles.tableCol, { alignItems: 'center' }]}>
                    <TrustLevel trustScore={exchanges?.trust_score ?? 0} />

                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableTxt} numberOfLines={2}>
                      {format(new Date(market.timestamp ?? new Date()), 'yyyy/MM/dd')}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

    </View>
  );
};

export default MarketSection;

const styles = StyleSheet.create({

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  tableColHeader: {
    width: 110,
    paddingHorizontal: 10,
    alignItems: 'center'

  },
  tableHeaderTxt: {
    fontWeight: 'bold',
    fontSize: 14,
    alignItems:'center'
  },
  indexCol: {
    width: 30,
    // flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableCol: {
    width: 110,
    paddingHorizontal: 10,
    justifyContent: "center",
    height: 35
  },
  tableTxt: {
    fontSize: 14,
    flexShrink: 1,
    width: 110,
    flexWrap: 'wrap',
  },
  indexTxt: {
    fontSize: 14,

  },
  logo: {
    width: 30,
    height: 30, borderRadius: 4
  }
});