import * as React from 'react';
import { Text, Button, SectionList, ScrollView , View, StyleSheet, Alert, Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class FeaturedArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  /* Get the user profile and send us to that page */
  loadNewsletterArticles(month, year) {
    const { navigation } = this.props;
    const access_token   = navigation.getParam('oauth_token', 'none');

    return fetch('http://intranet.opcit.net.au/api/views/api_features_articles?display_id=services_2&date[value][month]='+month+'&date[value][year]='+year+'', {
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
        this.props.navigation.navigate('Newsletter', {
          articles: responseJson, 
          oauth_token: access_token
        });
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
        console.error(error);
      });
  }

  static navigationOptions = {
    title: 'Featured Articles',
  };

  render() {

    const { navigation } = this.props;
    const articles = navigation.getParam('articles', 'NO-arts');
    const oauth    = navigation.getParam('oauth_token', 'none');

    return (
      <ScrollView>
        {articles.map((item) => {
          return (
            <View style={styles.contentView}>
              <Text style={{ fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
              <Text>{item.month} / {item.year}</Text>
              <Text>{item.body}</Text>
              <Button
                onPress={() => this.loadNewsletterArticles(item.month, item.year)}
                title="Open"
                color="#841584"
                accessibilityLabel="Open"
              />
            </View>
          );
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentView: {
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    margin: 6,
  }
});