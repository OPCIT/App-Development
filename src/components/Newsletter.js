import * as React from 'react';
import { Text, Button, SectionList, ScrollView , View, StyleSheet, Alert, Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class NewsletterScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Newsletter',
  };

  render() {

    const { navigation } = this.props;
    const articles = navigation.getParam('articles', 'NO-arts');
    const oauth    = navigation.getParam('oauth_token', 'none');

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {articles.map((item) => {
          return (
            <View style={styles.contentView}>
              <Text style={{ fontSize: 18, fontWeight: "bold"}}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          );
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 15
  },
  contentView: {
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: 4,
    margin: 4,
  }
});