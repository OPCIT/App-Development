import * as React from 'react';
import { Text, TextInput, View, Button, Alert, Image } from 'react-native';
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center", borderRadius: 100, paddingBottom: 20}}
          source={{uri: user.picture.url}}
        />
        <Text style={{fontSize: 18, fontWeight: "bold", paddingTop: 20}}>{user.name}</Text>
        <Text>Email: {user.mail}</Text>
        <Text>Role: {user.field_role_title.und[0].value}</Text>
      </View>
    );
  }
}