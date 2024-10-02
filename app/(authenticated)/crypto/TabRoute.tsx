import RenderCurrencyList from '@/components/RenderCurrencyList';
import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from "@react-navigation/elements"
import { Currency, ICurrency } from '@/interface/crypto';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface ITabProps {
  currencies: ICurrency[],
  currencyDetails: Currency,
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  handlePullRefresh?: () => {}
  refreshing?: boolean
}
const Page = ({ currencies, currencyDetails, handleScroll, handlePullRefresh, refreshing = false }: ITabProps) => {
  const headerHeight = useHeaderHeight()
  const insets = useSafeAreaInsets()
  const tabBarHeight = insets.bottom + 60;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: tabBarHeight }}

      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handlePullRefresh} />
      }
    >
      <View style={[defaultStyles.sectionBlock, { marginHorizontal: 0 }]}>
        {currencies.map((currency) => <RenderCurrencyList currency={currency} currencyDetails={currencyDetails} />)}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {

    paddingVertical: 20,
  },
});

export default Page;
