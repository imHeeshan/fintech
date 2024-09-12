import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton'
import Dropdown from '@/components/Dropdown'
import { useBalanceStore } from '@/store/balanceStore'
import { Ionicons } from '@expo/vector-icons'

const Page = () => {
  const { balance, transactions, clearTransactions, runTransaction } = useBalanceStore()

  const handleAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > .5 ? 1 : -1),
      date: new Date(),
      title: 'Added money'
    })
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
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

              <View style={[defaultStyles.circle, { height: 40, width: 40 }]}>
                <Ionicons name={transaction.amount < 0 ? "remove" : 'add'} size={24} />
              </View>
              <View style={{flex:1}}>
                <Text style={{fontWeight:'400'}}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleDateString()}</Text>
              </View>
              <Text >{transaction.amount} €</Text>
            </View>
          )
        })}
      </View>
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
    fontSize: 28,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  transactions: {
    marginHorizontal: 20,
    gap: 10,
    marginBottom:10
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 16,
  },
  emptyTxt: {
    color: Colors.gray,
    padding: 14, fontWeight: '400'
  }

})