import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Currency, ICurrency } from "@/interface/crypto";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements'
import Loader from "@/components/Loader";

const Page = () => {
  const headerHeight = useHeaderHeight()
  const insets = useSafeAreaInsets()
  const tabBarHeight = insets.bottom + 60;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState<ICurrency[]>([]);
  const [currencyForLogo, setCurrencyForLogo] = useState<Currency>({})

  const { data: currencies, isLoading, isFetching } = useQuery({
    queryKey: ['currencies', currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/listings?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!currentPage,
    placeholderData: [],
  });

  // When `currencies` change, update pagination data
  useEffect(() => {
    if (currencies) {
      // setPaginationData((prevData) => {
      //   // Filter out items that are already in the paginationData
      //   const newData = currencies.filter((currency) =>
      //     !prevData.find((item) => item.id === currency.id) // Assuming `id` is the unique key
      //   );
      //   return [...prevData, ...newData];
      // });
      setPaginationData((prevData) => [...prevData, ...currencies]);

    }

  }, [currencies]);
  const ids = currencies.map((currency: ICurrency) => currency.id).join(',');
  const { data: currencyInfo, isFetching: isLogoFetching } = useQuery({
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
  useEffect(() => {
    if (currencyInfo) {
      setCurrencyForLogo((prevData) => ({ ...prevData, ...currencyInfo }));
    }
  }, [currencyInfo])

  const renderItem = (currency) => {
    const checkPercentageValue = currency.quote.EUR.percent_change_1h > 0
    return (
      <Link href={`/crypto/${currency.id}`} asChild key={currency.id}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Image source={{ uri: currencyForLogo[currency.id]?.logo }} style={{ width: 40, height: 40 }} />
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
    );
  }

  const loadMoreItem = () => {
    if (!isFetching && currencies?.length > 0) {

      setCurrentPage((prevPage) => prevPage + 1);

    }
  };
  const handleScroll = ({ nativeEvent }) => {
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;
    if (isCloseToBottom && !isFetching && !isLogoFetching) {
      loadMoreItem();
    }
  };
  return (
    <ScrollView
      style={{
        // paddingBottom: tabBarHeight, 
        backgroundColor: Colors.background
      }}
      contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: tabBarHeight }}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}  // Adjust scroll performance
    >
      <View style={defaultStyles.sectionBlock}>
        {paginationData.map((currency) => {
          return renderItem(currency)
        })}
        <Loader />
        {/* {currencies.length !== 0 && <View style={{ backgroundColor:"red" }}><Loader /></View>} */}
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default Page;
