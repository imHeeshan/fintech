import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CurrencyPercentage from './CurrencyPercentage';
import { ICurrency } from '@/interface/cryptoInterface';


type renderProps = {
  currency: ICurrency,
}
const RenderCurrencyList = ({ currency }: renderProps) => {
  
  return (
    <Link href={`/crypto/cryptoDetails/${currency.id}`} asChild key={currency.id}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <Image source={{ uri: currency.image }} style={{ width: 40, height: 40 }} />
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
          <Text style={{ color: Colors.gray, fontSize: 13 }}>{currency.symbol.toLocaleUpperCase()}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 6 }}>
          <Text>$ {currency.current_price.toFixed(2)}</Text>
          <CurrencyPercentage percentage={currency.price_change_percentage_24h} />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default RenderCurrencyList

const styles = StyleSheet.create({})