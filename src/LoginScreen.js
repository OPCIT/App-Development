import * as React from 'react';
import {Text, TextInput, View, Button, Alert } from 'react-native';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: ''};
    this.state = {password: ''};
  }
  onPressLogin(){
  	Alert.alert('Thankyou For logging in')
  }
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', padding: 10}}>
        <View style={{flexDirection:'row',justifyContent: 'space-between', margin:20}}>
          <View style={{width:100, paddingTop:12}}>
            <Text>User Name</Text>
          </View>
          <View style={{width:180}}>
            <TextInput
              style={{height: 40}}
              placeholder="User Name!"
              onChangeText={(user) => this.setState({user})}
            />
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent: 'space-between', margin:20}}>
          <View style={{width:100, paddingTop:12}}>
            <Text>Password</Text>
          </View>
          <View style={{width:180}}>
            <TextInput
            style={{height: 40}}
            placeholder="Password!"
            onChangeText={(password) => this.setState({password})}
          />
          </View>
          </View>
        <View>
        <Button
  		onPress={this.onPressLogin}
  		title="Login"
  		style={{height: 40}}
  		accessibilityLabel="Learn more about this purple button"
		  />
	    </View>
    </View>
    );
  }
}
