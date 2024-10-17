import RenderCurrencyList from '@/components/RenderCurrencyList';
import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from "@react-navigation/elements"
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Colors from '@/constants/Colors';
import { SCREEN_HEIGHT } from '@/units/units';
import { ICurrency } from '@/interface/cryptoInterface';

interface ITabProps {
  currencies: ICurrency[],
  // currencyDetails: CurrencyInfo,
  handleScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  handlePullRefresh?: () => {}
  refreshing?: boolean,
  isFetching?: boolean
}
const Page = ({ currencies,
  handleScroll, handlePullRefresh, refreshing = false, isFetching }: ITabProps) => {
  const insets = useSafeAreaInsets()
  const tabBarHeight = insets.bottom + 60;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: tabBarHeight }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handlePullRefresh}
          tintColor={Colors.primaryMuted}
          colors={[Colors.primaryMuted]} />
      }
    >
      <View style={[defaultStyles.sectionBlock, { marginHorizontal: 0, gap: 14 }]}>
        {currencies.map((currency) => <RenderCurrencyList
          currency={currency} key={currency.id} />)}
        {isFetching && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
            <ActivityIndicator size={'large'} color={Colors.primaryMuted} />
          </View>
        )}
        {currencies?.length === 0 && (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={defaultStyles.emptyTxt}>No transaction yet...</Text>
        </View>)
        }
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
