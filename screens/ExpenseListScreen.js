import React, {Component} from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, Text } from 'react-native';
import ExpenseList from '../components/ExpenseList';
import { shared_styles } from '../constants/Styles';

export default class ExpenseListScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            expenses: [],
            loaded: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('category', 'Expenses'),
          ...shared_styles.header,
        };
      };


    render() {
        return(
            <SafeAreaView style={styles.container}>
                {this.renderIfLoaded()}
            </SafeAreaView>
        );
    }

    renderIfLoaded = () => {
        if(this.state.loaded) {
            if(this.state.expenses.length === 0){
                return (<Text style={styles.noDataText}>No Expenses Yet!</Text>)
            } else {
                return (
                <ExpenseList
                    data={this.groupBy(this.state.expenses)}
                    category={this.props.navigation.getParam('category', '')}
                >
                </ExpenseList>)
            } 
        } else {
            return <ActivityIndicator
                        size="large"
                        color="#b581cd"
                    ></ActivityIndicator>
        }
    }
    
    componentDidMount = () =>{ 
        this.getCategoryTransactions(this.props.navigation.getParam('category', ''));
    }

    getCategoryTransactions = async (category) => {
        try {
            let response = await fetch(
                `http://api.morga549.com/expenses?category=${category}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            this.setState({expenses: data, loaded: true});
        }
        catch(error) {
            console.warn(error);
        }
    };

     groupBy = (array) => {
        let dates = [...new Set(array.map(item => item.date))];
        let returnArr = [];
    
        for(date of dates){
            returnArr.push({title: date, data: array.filter((x) => x.date === date)});
        }
        
        return returnArr;
    }

}


const styles = StyleSheet.create({
  itemView: {
    marginVertical: 10,
  },
  noDataText: {
    alignSelf: 'center',
    fontSize: 25,
    color: '#b581cd'
  },
 container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
  },
});
