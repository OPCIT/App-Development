import * as React from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'User Profile',
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'NO-ID');
    const oauth = navigation.getParam('oauth_token', 'none');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.mail}</Text>
        <Text>Role: {user.field_role_title.und[0].value}</Text>
      </View>
    );
  }
}
