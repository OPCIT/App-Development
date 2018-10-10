import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator,} from 'react-navigation';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Login',
  }
);



export default class Screen extends React.Component {
  render() {
    return (
      <RootStack />
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
