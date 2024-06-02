import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [fruitQuantity, setFruitQuantity] = useState(1);
  const [vegetableQuantity, setVegetableQuantity] = useState(1);
  const [calculatedValue, setCalculatedValue] = useState("Press the CALCULATE button to see the result!");

  const fruits = [
    { name: 'Orange', price: 11 },
    { name: 'Blueberry', price: 12 },
    { name: 'Apple', price: 10 },
    { name: 'Banana', price: 12 },
    { name: 'Grapes', price: 9 }
  ];

  const vegetables = [
    { name: 'Potato', price: 5 },
    { name: 'Tomato', price: 3 },
    { name: 'Broccoli', price: 6 },
    { name: 'Celery', price: 7 },
    { name: 'Cauliflower', price: 10 },
    { name: 'Leeks', price: 5 }
  ];

  const renderQuantityItems = () => {
    return [1, 2, 3, 4, 5].map((quantity, index) => (
      <Picker.Item key={index} label={`${quantity}`} value={quantity} />
    ));
  };

  const renderFruitItems = () => {
    return fruits.map((fruit, index) => (
      <Picker.Item key={index} label={`${fruit.name} - $${fruit.price}`} value={fruit.name} />
    ));
  };

  const renderVegetableItems = () => {
    return vegetables.map((vegetable, index) => (
      <Picker.Item key={index} label={`${vegetable.name} - $${vegetable.price}`} value={vegetable.name} />
    ));
  };

  const getItemPrice = (itemName, itemList) => {
    const item = itemList.find(item => item.name === itemName);
    return item ? item.price : 0;
  };

  const calculateTotalPrice = () => {
    const fruitPrice = getItemPrice(selectedFruit, fruits) * fruitQuantity;
    const vegetablePrice = getItemPrice(selectedVegetable, vegetables) * vegetableQuantity;
    const totalPrice = fruitPrice + vegetablePrice;
    setCalculatedValue(`Total Cost of Order: $${totalPrice}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.heading}>Produce Owners Group</Text>
      </View>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./assets/produce.png')}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Select a Fruit:</Text>
        <View style={styles.row}>
          <Picker
            style={[styles.picker, styles.pickerHalf]}
            selectedValue={selectedFruit}
            onValueChange={(itemValue) => setSelectedFruit(itemValue)}
          >
            {renderFruitItems()}
          </Picker>
          <Picker
            style={[styles.picker, styles.pickerQuarter]}
            selectedValue={fruitQuantity}
            onValueChange={(itemValue) => setFruitQuantity(itemValue)}
          >
            {renderQuantityItems()}
          </Picker>
        </View>
        <Text style={styles.selectedText}>
          {selectedFruit ? `You selected: ${selectedFruit}, Quantity: ${fruitQuantity}` : 'Please select a fruit and quantity'}
        </Text>

        <Text style={styles.label}>Choose a Vegetable:</Text>
        <View style={styles.row}>
          <Picker
            style={[styles.picker, styles.pickerHalf]}
            selectedValue={selectedVegetable}
            onValueChange={(itemValue) => setSelectedVegetable(itemValue)}
          >
            {renderVegetableItems()}
          </Picker>
          <Picker
            style={[styles.picker, styles.pickerQuarter]}
            selectedValue={vegetableQuantity}
            onValueChange={(itemValue) => setVegetableQuantity(itemValue)}
          >
            {renderQuantityItems()}
          </Picker>
        </View>
        <Text style={styles.selectedText}>
          {selectedVegetable ? `You selected: ${selectedVegetable}, Quantity: ${vegetableQuantity}` : 'Please select a vegetable and quantity'}
        </Text>

        <View style={styles.calculateContainer}>
          <Button style = {styles.button} title="CALCULATE" onPress={calculateTotalPrice} color="#adc178" />
          <Text style={styles.totalText}>
          {calculatedValue}
          </Text>
        </View>
      </View>

      <Text style={styles.developers}>
        Developed by Pramod Sinhala Pedige, Mai Kudo, Thanh Tra Tran, Mingyou Han
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ead2',
  },
  developers: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#6c584c',
  },
  backgroundImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#a98467',
    width: '100%',
    paddingVertical: 10,
    marginTop: 50,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#adc178',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    padding: 5,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  picker: {
    marginBottom: 10,
    color: '#6c584c',
    fontWeight: 'bold',
  },
  pickerHalf: {
    width: '65%',
  },
  pickerQuarter: {
    width: '30%',
  },
  selectedText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#a98467',
  },
  calculateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#adc178',
    fontWeight: 'bold',
    color: '#fff',
  },
  totalText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6c584c',
  },
});
