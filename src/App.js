import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Constants } from 'expo';
import LoginScreen from './components/LoginScreen';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginScreen />
      </View>
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
