import React, { Component } from 'react';
import {Text, TextInput, View } from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {user: ''};
    this.state = {password: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text>User Name</Text>

        <TextInput
          style={{height: 40}}
          placeholder="User Name!"
          onChangeText={(user) => this.setState({user})}
        />
        <Text>Password</Text>

        <TextInput
          style={{height: 40}}
          placeholder="Please enter your password"
          onChangeText={(password) => this.setState({password})}
        />
      </View>
    );
  }
}
