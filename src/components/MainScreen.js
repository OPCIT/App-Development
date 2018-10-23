import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, Image } from 'react-native';
import { Constants } from 'expo';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    /* Set the general states for when the App first loads */
    this.state = {
      access_token: 'none',
    };
  }

  /* When we press Logout, remove our saved variables */
  onPressLogout() {
    this.setState({
        access_token: 'none',
      },
      function() {}
    );

    this.props.navigation.navigate('Login', {
          oauth_token: 'none'
        });
    }

  /* Get the user profile and send us to that page */
  getUserProfile() {
    const { navigation } = this.props;
    const access_token   = navigation.getParam('oauth_token', 'none');

    return fetch('http://intranet.opcit.net.au/api/system/connect', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      body: JSON.stringify({}),
      cache: 'no-cache',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.navigation.navigate('Profile', { 
          user: responseJson.user, 
          oauth_token: access_token
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  /* Get the user profile and send us to that page */
  getFeaturedArticles() {
    const { navigation } = this.props;
    const access_token   = navigation.getParam('oauth_token', 'none');

    return fetch('http://intranet.opcit.net.au/api/views/api_features_articles?display_id=services_1', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      cache: 'force-cache',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.props.navigation.navigate('Featured', {
          articles: responseJson, 
          oauth_token: access_token
        });
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
        console.error(error);
      });
  }

  loadLeaveForm() {
    const { navigation } = this.props;
    const access_token   = navigation.getParam('oauth_token', 'none');

    this.props.navigation.navigate('LeaveForm', {
      oauth_token: access_token
    });
  }

  static navigationOptions = {
    title: 'Welcome to the Intranet',
  };

  render() {
    const { navigation } = this.props;
    const access_token   = navigation.getParam('oauth_token', 'none');
    if (access_token === 'none') {
      this.props.navigation.navigate('Login', {
        oauth_token: 'none'
      });
    }

    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>

      <View>
          <Image
            style={{ width: 200, height: 50, alignSelf: "center"}}
            source={require('../assets/logo_trans.png')}
            />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        
          <View style={{ paddingTop: 12 }}>
            <Button
              onPress={() => this.getUserProfile()}
              title="Profile Page"
              style={{ height: 40 }}
              accessibilityLabel="Profile Page"
            />
          </View>

          <View style={{ paddingTop: 12 }}>
            <Button
              onPress={() => this.getFeaturedArticles()}
              title="Featured Articles"
              style={{ height: 40 }}
              accessibilityLabel="Featured Articles"
            />
          </View>

          <View style={{ paddingTop: 12 }}>
            <Button
              onPress={() => this.loadLeaveForm()}
              title="Leave Form"
              style={{ height: 40 }}
              accessibilityLabel="Leave Form"
            />
          </View>

          <View style={{ paddingTop: 24 }}>
            <Button
              onPress={() => this.onPressLogout()}
              title="Logout"
              style={{ height: 40 }}
              accessibilityLabel="Logout"
            />
          </View>

        </View>
      </View>
    );
  }
}
