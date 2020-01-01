import React, {Component} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { ProgressTracker } from '../components/ProgressTracker';
import {shared_styles } from '../constants/Styles';

export default class OverviewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    }
  }

  componentDidMount() {
    this.getOverview(1);
  }

  renderIfLoaded = () => {
    if(this.state.loaded) {
        return (
          <FlatList
          data={this.state.data}
          renderItem={
            ({item}) => (
              <View style={styles.itemView}>
                <ProgressTracker
                  title={item.category_name}
                  spent={item.spent}
                  budgetted={item.budgetted_amount}
                  onPress={this.onPress}
                >
                </ProgressTracker>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.getOverview(1)}
          refreshing={!this.state.loaded}
          />
        )  
    } else {
        return <ActivityIndicator
                    size="large"
                    color="#b581cd"
                ></ActivityIndicator>
    }
  }

  getOverview = async (budget_id) => {
    try {
        let response = await fetch(
          `http://api.morga549.com/overview`,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );
      let data = await response.json();
      this.setState({data: data, loaded: true});
      }
      catch(error) {
        console.warn(error);
      }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>    
        {this.renderIfLoaded()}
      </SafeAreaView>
    );
  }

  onPress = (category) => {
    this.props.navigation.navigate('ExpenseList', {category: category})
  } 
}

OverviewScreen.navigationOptions = {
    title: 'Overview',
    ...shared_styles.header,
};

const styles = StyleSheet.create({
  itemView: {
    marginVertical: 10,
  },
  noDataText: {
    alignSelf: 'center',
    fontSize: 25,
  },
  container: {
      flex: 1,
  },
});
