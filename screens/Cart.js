import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, Alert } from 'react-native';

import { CartContext } from '../CartContext';

export function Cart({ navigation }) {

  const { items, getItemsCount, getTotalPrice } = useContext(CartContext);
  const [name, onNameChangeText] = React.useState();
  const [email, onEmailChangeText] = React.useState();
  const [address, onAddressChangeText] = React.useState();
  const [cvv, onCVVChangeText] = React.useState();
  const [cardDetails, oncardChangeText] = React.useState();
  const [date, ondateChangeText] = React.useState();
  const [number, onChangeNumber] = React.useState(null);

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    });
    return (
      <>
        <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>$ {total}</Text>
        </View>
      </>
    );
  }

  const handleFields = () => {
    if (email && address && name && cardDetails && cvv && date) {
      Alert.alert('Successfully')
    } else {
      Alert.alert('Please fill all fields')
    }
  }

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>{item.product.name} x {item.qty}</Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
      </View>
    );
  }

  return (
    <>

      <View>
        <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '700' }}>Your details</Text>
        <TextInput
          style={styles.input}
          placeholder='Name'
          onChangeText={e => onNameChangeText(e)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder='Email Address'
          onChangeText={onEmailChangeText}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder='Address'
          onChangeText={onAddressChangeText}
          value={address}
        />
        <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '700' }}>Payment Details</Text>
        <TextInput
          style={styles.input}
          placeholder='XXXX-XXXX-XXXX-XXXX'
          onChangeText={oncardChangeText}
          value={cardDetails}
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            placeholder='CVV'
            onChangeText={onCVVChangeText}
            value={cvv}
          />
          <TextInput
            style={styles.input}
            placeholder='Expiry date'
            onChangeText={ondateChangeText}
            value={date}
          />
        </View>
      </View>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
        ListFooterComponent={Totals}
      />
      <Button title='Checkout' onPress={handleFields} />
    </>
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: 'row',
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'black'
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333'
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
