import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import OverviewScreen from '../screens/OverviewScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ExpenseListScreen from '../screens/ExpenseListScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const AddItemStack = createStackNavigator(
  {
    AddItem: AddItemScreen,
  },
  config
);

AddItemStack.navigationOptions = {
  tabBarLabel: 'Add Item',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add-circle`
          : 'md-add-circle'
      }
    />
  ),
};

AddItemStack.path = '';

const OverviewStack = createStackNavigator(
  {
    Overview: OverviewScreen,
    ExpenseList: ExpenseListScreen,
  },
  config
);

OverviewStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon 
      focused={focused} 
      name={
        Platform.OS === 'ios' 
          ? 'ios-stats' 
          : 'md-stats'
      } 
    />
  ),
};

OverviewStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  AddItemStack,
  OverviewStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
