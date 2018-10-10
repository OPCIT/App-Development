import * as React from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
    //this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin() {
    return fetch('http://intranet.opcit.net.au/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: 
          'client_id=example_id&username=jeannie.panting@opc.com.au&password=30S3condstom@rs&grant_type=password',
      
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.error_description,
        }, function(){

        });
        Alert.alert(responseJson.error_description);
      })
      .catch(error => {
        console.error(error);
      });
  }
  static navigationOptions = {
    title: 'Welcome',
  };

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
              placeholder="Password!"
              onChangeText={password => this.setState({ password })}
            />
          </View>
        </View>
        <View>
          <Button
            onPress={() => this.onPressLogin()}
            title="Login"
            style={{ height: 40 }}
            accessibilityLabel="Login"
          />
        </View>
        <View>
        <Text data={this.state.dataSource} />
        </View>
      </View>
    );
  }
}
