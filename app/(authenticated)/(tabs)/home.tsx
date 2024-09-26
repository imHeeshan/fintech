import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton'
import Dropdown from '@/components/Dropdown'
import { useBalanceStore } from '@/store/balanceStore'
import { Ionicons } from '@expo/vector-icons'
import WidgetList from '@/components/SortableList/WidgetList'
import { useHeaderHeight } from '@react-navigation/elements'
import Loader from '@/components/Loader'
const Page = () => {
  const headerHeight = useHeaderHeight()
 
  // Using selectors for specific state pieces
  const balance = useBalanceStore((state) => state.balance);
  const transactions = useBalanceStore((state) => state.transactions);
  const clearTransactions = useBalanceStore((state) => state.clearTransactions);
  const runTransaction = useBalanceStore((state) => state.runTransaction);

  const handleAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added money',
    });
  };

  console.log('Rendering Home Screen');

  return (
    // <View style={[{ backgroundColor: 'lightblue', flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
    //     <Loader />
    // </View>
    <ScrollView style={{ backgroundColor: Colors.background, }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >

      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <RoundButton icon='add' text="Add money" onPress={handleAddMoney} />
        <RoundButton icon='refresh' text="Exchange" onPress={clearTransactions} />
        <RoundButton icon='list' text="Details" />
        <Dropdown />
      </View>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transactions}>
        {transactions.length === 0 &&
          (<Text style={styles.emptyTxt}>No transaction yet</Text>)
        }
        {transactions.map((transaction) => {
          return (
            <View key={transaction.id} style={styles.transaction}>
              <View style={[defaultStyles.smallCircle]}>
                <Ionicons name={transaction.amount < 0 ? "remove" : 'add'} size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
              </View>
              <Text >{transaction.amount}€</Text>
            </View>
          )
        })}
      </View>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
      <WidgetList />
    </ScrollView>

  )
}

export default Page

const styles = StyleSheet.create({
  account: {
    margin: 50,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  currency: {
    fontSize: 20,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  transactions: {
    marginHorizontal: 20,
    gap: 20,
    marginBottom: 10,
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 16,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

  },
  emptyTxt: {
    color: Colors.gray,
    padding: 14, fontWeight: '400'
  }

})