import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { CurrencyInfo, ICurrency } from '@/interface/crypto';
import CurrencyPercentage from './CurrencyPercentage';


type renderProps = {
  currency: ICurrency,
  currencyDetails: CurrencyInfo
}
const RenderCurrencyList = ({ currency, currencyDetails }: renderProps) => {
  const checkPercentageValue = currency.quote.EUR.percent_change_1h
  return (
    <Link href={`/crypto/cryptoDetails/${currency.id}`} asChild key={currency.id}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Image source={{ uri: currencyDetails[currency.id]?.logo }} style={{ width: 40, height: 40 }} />
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
          <Text style={{ color: Colors.gray, fontSize: 13 }}>{currency.symbol}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 6 }}>
          <Text>{currency.quote.EUR.price.toFixed(2)}€</Text>
          <CurrencyPercentage percentage={checkPercentageValue} />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default RenderCurrencyList

const styles = StyleSheet.create({})