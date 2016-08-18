'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Component,
  ScrollView,
  ListView,
  RefreshControl,
  AlertIOS,
  TouchableHighlight
} from 'react-native';


var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#012a77',
  },
  row: {
    flex: 1,
    padding: 26,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  newsPreviewStyle: {
    fontSize: 14,
    marginTop: 15
  }
});

var DOMParser = require('xmldom').DOMParser;
var objs = [];
var newsPreview=[];
var newsURL = [];
var result = [];
var NewsDetail = require('./Classes/NewsDetail.js');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


class Welcome extends Component {

  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.showNewsDetail = this.showNewsDetail.bind(this);
    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows([])
    };
  }


  showNewsDetail(result, n) {
    this.props.navigator.push({
      title: 'Подробнее',
      component: NewsDetail,
      passProps: {link : result[n].linkURL}
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    var n = rowID;
    return (
      <TouchableHighlight onPress={() => this.showNewsDetail(result, n)} underlayColor='#DDDDDD'>
      <View style={styles.row}>
      <Text style={styles.newsTitle}>{rowData.title}</Text>
      <Text style={styles.newsPreviewStyle}>{rowData.preview}</Text>
      </View>
      </TouchableHighlight>
    )
  }

  /*parseVideos(responseText) {
    console.log("Parsing the feed...");
    var doc = new DOMParser().parseFromString(responseText, 'text/xml');
    var videos = doc.getElementsByTagName('title_news');
    var thumbs = doc.getElementsByTagName('preview_news');
    for (var i=0; i < videos.length; i++) {
      objs.push(videos[i].textContent),
      newsPreview.push(thumbs[i].textContent)
    }

    for (var y=0; y < objs.length; y++) {
      result.push({ title: objs[y], preview: newsPreview[y]})
    }

    console.log('Finished parsing. Got this on TITLE: ' + objs);
    console.log('Finished parsing. Got this on PREVIEW: ' + result);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(result)
    });
  }*/


  fetchVideos() {
    console.log('Fetching video feed...');
  var url = "http://kpfu.ru/portal/PRIVATEOFFICE_ANDROID.news?p_news=2";
  fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      console.log("Parsing the feed...");
      var doc = new DOMParser().parseFromString(responseText, 'text/xml');
      var videos = doc.getElementsByTagName('title_news');
      var thumbs = doc.getElementsByTagName('preview_news');
      var linksToTheNews = doc.getElementsByTagName('url_news');
      for (var i=0; i < videos.length; i++) {
        objs.push(videos[i].textContent),
        newsPreview.push(thumbs[i].textContent),
        newsURL.push(linksToTheNews[i].textContent)
      }

      for (var y=0; y < objs.length; y++) {
        result.push({ title: objs[y], preview: newsPreview[y], linkURL: newsURL[y]})
      }

      console.log('Finished parsing. Got this on TITLE: ' + objs);
      console.log('Finished parsing. Got this on PREVIEW: ' + result);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result)
      });
    })
    .catch((error) => {
      console.log('Error fetching the feed: ', error);
    });
  }

  refresOnReload() {
    this.setState({
      dataSource: ds.cloneWithRows([]),
      refreshing: true
    });
    objs = [];
    newsPreview=[];
    newsURL=[];
    result = [];
    var url = "http://kpfu.ru/portal/PRIVATEOFFICE_ANDROID.news?p_news=2";
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        console.log("Parsing the feed...");
        var doc = new DOMParser().parseFromString(responseText, 'text/xml');
        var videos = doc.getElementsByTagName('title_news');
        var thumbs = doc.getElementsByTagName('preview_news');
        var linksToTheNews = doc.getElementsByTagName('url_news');
        for (var i=0; i < videos.length; i++) {
          objs.push(videos[i].textContent),
          newsPreview.push(thumbs[i].textContent),
          newsURL.push(linksToTheNews[i].textContent)
        }

        for (var y=0; y < objs.length; y++) {
          result.push({ title: objs[y], preview: newsPreview[y], linkURL: newsURL[y]})
        }

        console.log('Finished parsing. Got this: ' + result);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result),
          refreshing: false
        });
      })
      .catch((error) => {
        console.log('Error fetching the feed: ', error);
      });
}


  componentDidMount() {
    this.fetchVideos();
  }

  render() {
    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresOnReload.bind(this)}
          />
        }
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }
}

module.exports = Welcome;
