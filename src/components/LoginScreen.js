import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { Constants } from 'expo';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);

    /* Set the general states for when the App first loads */
    this.state = {
      access_token: 'none',
    };
  }

  /* When the user presses Login */
  onPressLogin() {
    return fetch('http://intranet.opcit.net.au/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: 'example_id',

        /* If the details aren't provided, use these defaults */
        username: this.state.user ? this.state.user : 'jeannie.panting@opc.com.au',
        password: this.state.password ? this.state.password : '30S3condstom@rs',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error_description) {

          /* If we get an error description returned, something went wrong, so error */
          Alert.alert('Error: ' + responseJson.error_description);
        } else {

          /* Otherwise everything worked, so update the states and Alert us */
          this.setState(
            {
              access_token: responseJson.access_token,
            },
            function() {}
          );

        this.props.navigation.navigate('Main', {
          oauth_token: responseJson.access_token
        });
        
        }
      })
      .catch(error => {
        /* This is if the Fetch itself failed I think.... */
        Alert.alert('Error: ' + error);
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{ width: 100, paddingTop: 12 }}>
            <Text>User Name</Text>
          </View>
          <View style={{ width: 180 }}>
            <TextInput
              style={{ height: 40 }}
              placeholder="User Name!"
              onChangeText={user => this.setState({ user })}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{ width: 100, paddingTop: 12 }}>
            <Text>Password</Text>
          </View>
          <View style={{ width: 180 }}>
            <TextInput
              style={{ height: 40 }}
              secureTextEntry={true}
              placeholder="Password!"
              onChangeText={password => this.setState({ password })}
            />
          </View>
        </View>
        <View style={{ paddingTop: 12 }}>
          <Button
            onPress={() => this.onPressLogin()}
            title="Login"
            style={{ height: 40 }}
            accessibilityLabel="Login"
          />
        </View>
      </View>
    );
  }
}
