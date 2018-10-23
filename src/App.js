import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';

import LeaveFormScreen from './components/LeaveForm';
import NewsletterScreen from './components/Newsletter';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import ProfileScreen from './components/ProfileScreen';
import FeaturedArticles from './components/FeaturedArticles';

const RootStack = createStackNavigator(
  {
    LeaveForm: LeaveFormScreen,
    Newsletter: NewsletterScreen,
    Login: LoginScreen,
    Main: MainScreen,
    Profile: ProfileScreen,
    Featured: FeaturedArticles,
  },
  {
    initialRouteName: 'Main',
  }
);

export default class Screen extends React.Component {
  render() {
    return <RootStack />;
  }
}
