import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Button, TextInput, Picker, KeyboardAvoidingView, Keyboard, ToastAndroid } from 'react-native';
import DecimalCurrencyInput  from '../components/DecimalCurrencyInput';
import AndroidDatePicker from '../components/AndroidDatePicker';
import { shared_styles } from '../constants/Styles';

export default class AddItemScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
          loading: false,
          amount: 0.0,
          category: '',
          description: '',
          date: '',
          categories: [],
        }

    }

    componentDidMount() {
      this.getBudgetCategories();
    }

    componentWillUnmount() {
      this.setState({});
    }

    getBudgetCategories = async () => {
      try {
        let response = await fetch(
          'http://api.morga549.com/categories',
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      let data = await response.json();
      this.setState({categories: data.map(element => {return element.category_name}).sort()});
      }
      catch(error) {
        console.warn('Error in getBudgetCategories(): \n', error);
      }
    }

    addExpense = async () => {
      try {
          this.setState({loading: true});
          Keyboard.dismiss();
          let response = await fetch(
              'http://api.morga549.com/expenses',
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      'amount': this.state.amount,
                      'category': this.state.category,
                      'description': this.state.description,
                      'date': this.state.date,
                      'user': 'morga549'
                  })
              }
          );
          console.warn(response);
          let data = await response.json();
          console.warn(data);
          ToastAndroid.showWithGravity(
            'Expense Added',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
      } catch(error) {
          console.warn('Error in addExpense()');
          console.warn(JSON.stringify(error));
      }
  } 

    render() {

      let categoryItems = this.state.categories.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
      });

      return (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.inputLable}>Amount</Text>
            <View style={styles.inputContiner}>
              <DecimalCurrencyInput
                style={styles.amount}
                onUpdate={data => {
                  this.setState({ amount: data });
                }}
              ></DecimalCurrencyInput>
            </View>
            <Text style={styles.inputLable}>Category</Text>
            <View style={styles.inputContiner}>
              <Picker
                style={styles.category}
                mode="dropdown"
                selectedValue={this.state.category}
                onValueChange={category => this.setState({ category: category })}
              >
                {categoryItems}
              </Picker>
            </View>
            <Text style={styles.inputLable}>Description</Text>
            <View style={styles.inputContiner}>
              <TextInput
                style={styles.description}
                placeholder="Description"
                onChangeText={text => this.setState({ description: text })}
                clearTextOnFocus={true}
              ></TextInput>
            </View>
            <Text style={styles.inputLable}>Date</Text>
            <View style={styles.inputContiner}>
              <AndroidDatePicker
                onUpdate={date => {
                  this.setState({ date: date });
                }}
              ></AndroidDatePicker>
            </View>
            <Button
              style={styles.submitButton}
              color='#b581cd'
              title="Submit Expense"
              onPress={() => this.addExpense()}
            ></Button>
          </View>
        </View>
        );
    }
  
};

AddItemScreen.navigationOptions = {
  title: 'Add an Expense',
  ...shared_styles.header,
};

const styles = StyleSheet.create({

 container: {
    flex: 1,
  },
  inputContiner: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 25,
    justifyContent: 'center',
    paddingHorizontal: 3,
    marginHorizontal: 5
  },
  inputLable: {
    marginLeft: 6,
    fontSize: 20
  },
  title: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 30
  },
  wrapper: {
    marginTop: 40
  },
  category: {
    height: 30,
  },
  description: {
    marginLeft: 4,
    height: 30,
  },
  submitButton: {
    marginHorizontal: 10,
  },
});
