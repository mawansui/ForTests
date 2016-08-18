'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Component,
  ScrollView,
  WebView
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

var htmlstyles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'Times New Roman',
    margin: 10
  },
  p: {
    fontSize: 16,
    fontFamily: 'Times New Roman',
    margin: 10
  }
});

var DOMParser = require('xmldom').DOMParser;
var Entities = require('html-entities').AllHtmlEntities;
var HTMLView = require('react-native-htmlview');
var articleText;
var realArticleText;
var transformedString;

class NewsDetail extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false
    };
  }

  componentWillMount() {
    this.fetchNews();
  }

  fetchNews() {
    console.log('Fetching news from given link...');
    var newsID = this.props.link;
    console.log('Given newsID: ' + newsID);
    var newsURLAddress = "http://kpfu.ru/portal/PRIVATEOFFICE_ANDROID.news_content?p_id="+newsID;
    console.log('Resulted combined URL: ' + newsURLAddress);

    var entities = new Entities();


    fetch(newsURLAddress)
      .then((response) => response.text())
      .then((responseText) => {
        console.log('Now the parsing starts!');

        transformedString = entities.decode(responseText);
        console.log('transformedString has loaded!!!');

      })
      this.setState({
        isLoaded: true
      });
  }

  render() {
    console.log('render function works');
    return (
      <WebView
        source={{html: transformedString}}
        scalesPageToFit={false}
      />
    )
  }
}

module.exports = NewsDetail;
