import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ICurrency } from '@/interface/crypto'
import Colors from '@/constants/Colors'
import { useHeaderHeight } from '@react-navigation/elements'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Loader from '@/components/Loader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const ITEMS_PER_PAGE = 10;
const Page = () => {
  const headerHeight = useHeaderHeight()
  const insets = useSafeAreaInsets()
  const tabBarHeight = insets.bottom + 50;
  const [page, setPage] = useState(1)
  const currencies = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const response = await fetch(`/api/listings?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    placeholderData: [],
  });
  const ids = currencies.data?.map((currency: ICurrency) => currency.id).join(',');
  const { data: currencyInfo } = useQuery({
    queryKey: ['currencyInfo', ids],
    queryFn: async () => {
      const response = await fetch(`/api/info?ids=${ids}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!ids,
    placeholderData: []
  });

  if (currencies.data?.length === undefined || 0) {
    return <Loader />
  }
  return (
    <SafeAreaView style={{ flex: 1, marginTop: headerHeight }}>
      <ScrollView style={{ backgroundColor: Colors.background, flex: 1 }}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false}
      >
        <View style={defaultStyles.sectionBlock}>
          <FlatList
            data={currencies.data}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            keyExtractor={item => item.id}
            ListFooterComponent={() => <Loader />}
            showsVerticalScrollIndicator={false}
            ListFooterComponentStyle={{ marginVertical: 30 }}
            renderItem={({ item: currency }) => {
              const checkPercentageValue = currency.quote.EUR.percent_change_1h > 0
              return (
                <Link href={`/crypto/${currency.id}`} asChild key={currency.id}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
                    <Image source={{ uri: currencyInfo?.[currency.id]?.logo }} style={{ width: 40, height: 40 }} />
                    <View style={{ flex: 1, gap: 6 }}>
                      <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                      <Text style={{ color: Colors.gray, fontSize: 13 }}>{currency.symbol}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 6 }}>
                      <Text>{currency.quote.EUR.price.toFixed(2)}€</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name={checkPercentageValue ? 'caret-up' : 'caret-down'} size={16} color={checkPercentageValue ? Colors.success : Colors.danger} />
                        <Text>{currency.quote.EUR.percent_change_1h.toFixed(2)}</Text>
                      </View>
                    </View>

                  </TouchableOpacity>
                </Link>
              )
            }}
          />
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}

export default Page

const styles = StyleSheet.create({
  currencyLogo: {
    width: 50, height: 50
  }
})