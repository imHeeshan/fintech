import React, { useEffect, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements'
import TabRoute from "../crypto/TabRoute";
import { currencyFilter } from "@/constants/ReusableFn";
import { NormalLoader } from "@/components/Loader";
import { ICurrency } from "@/interface/cryptoInterface";


const Page = () => {
  const headerHeight = useHeaderHeight()
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState<ICurrency[]>([]);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false)

  const { data: currencies, isFetching, refetch } = useQuery({
    queryKey: ['currencies', currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/listings?page=${currentPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    enabled: false,
    placeholderData: [],
  });
  useEffect(() => {
    if (currentPage || refreshing) {
      refetch();
    }
  }, [currentPage, refreshing]);
  useEffect(() => {
    if (refreshing) {
      setPaginationData([])
    }
    if (currentPage > 1) {
      setIsLoadingData(true)
    }
    if (currencies?.length > 0) {
      console.log(currencies[0]);
      
      setPaginationData((prevData) => {
        const newData = currencies.filter(
          (currency: { id: string }) => !prevData.some((item) => item.id === currency.id) // Avoid duplicates
        );
        return [...prevData, ...newData];
      });
      setRefreshing(false)
      setIsLoadingData(false)
    }

  }, [currencies, refreshing]);


  const loadMoreItem = () => {
    if (!isFetching && currencies?.length > 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = event
    const isCloseToBottom =
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
      nativeEvent.contentSize.height - 20;
    if (isCloseToBottom && !isFetching) {
      loadMoreItem();
    }
  };
  const handlePullRefresh = async () => {
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
          currencies={paginationData}
          handleScroll={handleScroll}
          handlePullRefresh={handlePullRefresh}
          refreshing={refreshing}
          isFetching={isLoadingData}
        />;
      case 'gainer':
        return <TabRoute
          currencies={currencyFilter(paginationData, "gainer")}
          handleScroll={handleScroll}

        />;
      case 'losers':
        return <TabRoute
          currencies={currencyFilter(paginationData, "loser")}
          handleScroll={handleScroll}
        />
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

  if (paginationData.length === 0 && !refreshing) {
    return <NormalLoader />
  }

  return (
    <View style={{ paddingTop: headerHeight, flex: 1, paddingHorizontal: 10 }}>
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