import React, { useEffect, useState } from "react";
import { Alert, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import Colors from "@/constants/Colors";
import { Currency, ICurrency } from "@/interface/crypto";
import { useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements'
import TabRoute from "../crypto/TabRoute";
import { currencyFilter } from "@/constants/ReusableFn";


const Page = () => {
  const headerHeight = useHeaderHeight()
  const insets = useSafeAreaInsets()
  const tabBarHeight = insets.bottom + 60;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState<ICurrency[]>([]);
  const [currencyDetails, setCurrencyDetails] = useState<Currency>({})
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(30)
  const [refreshing, setRefreshing] = useState(false);

  const { data: currencies, isFetching } = useQuery({
    queryKey: ['currencies', currentPage, limit],
    queryFn: async () => {
      const response = await fetch(`/api/listings?page=${currentPage}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: !!currentPage,
    placeholderData: [],
  });

  const allIds = [...currencies.map((currency: ICurrency) => currency.id)];

  const uniqueIds = [...new Set(allIds)].join(',');
  useEffect(() => {
    if (currencies) {
      setPaginationData((prevData) => [...prevData, ...currencies]);
      setRefreshing(false)
      // setPaginationData((prevData) => {
      //   // Filter out items that are already in the paginationData
      //   const newData = currencies.filter((currency) =>
      //     !prevData.find((item) => item.id === currency.id) // Assuming `id` is the unique key
      //   );
      //   return [...prevData, ...newData];
      // });
    }

  }, [currencies, refreshing]);

  const { data: currencyInfo, isFetching: isLogoFetching } = useQuery({
    queryKey: ['currencyInfo', uniqueIds],
    queryFn: async () => {
      const response = await fetch(`/api/info?ids=${uniqueIds}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();

    },
    enabled: !!uniqueIds,
    placeholderData: []

  });
  useEffect(() => {
    if (currencyInfo) {
      setCurrencyDetails((prevData) => ({ ...prevData, ...currencyInfo }));
    }
  }, [currencyInfo])

  const loadMoreItem = () => {
    if (!isFetching && currencies?.length > 0) {
      setLimit(10)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;
    if (isCloseToBottom && !isFetching && !isLogoFetching) {
      loadMoreItem();
    }
  };
  const handlePullRefresh = async () => {
    setLimit(30)
    setPaginationData([])
    setRefreshing(true)
    setCurrentPage(1)
  }
  type Route = {
    key: 'all' | 'gainer' | 'losers';
    title: string
  };
  type State = {
    index: number;
    routes: Route[];
  };
  const [routes] = useState<Route[]>([
    { key: 'all', title: 'All' },
    { key: 'gainer', title: 'Gainers' },
    { key: 'losers', title: 'Losers' },
  ]);
  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'all':
        return <TabRoute
          currencies={paginationData} currencyDetails={currencyDetails}
          handleScroll={handleScroll}
          handlePullRefresh={handlePullRefresh}
          refreshing={refreshing}
        />;
      case 'gainer':
        return <TabRoute
          currencies={currencyFilter(paginationData, "gainer")}
          currencyDetails={currencyDetails} />;
      case 'losers':
        return <TabRoute
          currencies={currencyFilter(paginationData, "loser")} currencyDetails={currencyDetails} />
      default:
        return null;
    }
  };
  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={[styles.indicator, {}]}
      renderLabel={({ route, focused, color }) => (
        <View style={{
          width: (Dimensions.get('window').width - 20) / 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={[styles.label, focused && styles.activeLabel]}>{route.title}</Text>
        </View>
      )}
    />
  );
  return (
    <View style={{ paddingTop: headerHeight, flex: 1, paddingHorizontal: 10 }}>
      <Text>{refreshing.toString()} {currentPage} {paginationData.length}</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}

      />
    </View>
  );
}
export default Page


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.background,
    height: 40
  },
  indicator: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 30
  },
  label: {
    color: Colors.gray,
    textAlign: 'center',
    width: '100%',
  },
  activeLabel: {
    fontWeight: '500',
    color: Colors.dark

  },
});