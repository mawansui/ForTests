import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  NavigatorIOS
} from 'react-native';
import Sidebar from 'react-native-sidebar';

var array;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class menuNavigator extends Component {
  render() {
    return (
    <NavigatorIOS
      initialRoute={{
        title: 'Новости',
        component: FetchingFGH
      }}
      style={{flex: 1}}
    />
  );
  }
}


class FetchingFGH extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  _renderRow(rowData) {
    image = rowData.imageURI;
    return (
      <View style={styles.row}>
      <Text>{rowData.title}</Text>
      <Text>{rowData.pubdate}</Text>
      <Text>{rowData.id}</Text>
      <Text>{rowData.subtitle}</Text>
      <Image source={{uri: image}} style={{flex: 1, width: 50, height: 50}} />
      <Text>{rowData.link}</Text>
      </View>
    )
  }

  fetchNews() {
    return fetch('https://raw.githubusercontent.com/mawansui/ForTests/master/validjson')
    .then((response) => response.json())
    .then((responseJSON) => {
      array = responseJSON.array;
      console.log(array);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(array)
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.fetchNews()
  }


  render() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        enableEmptySections
      />
    );
  }
  }

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

AppRegistry.registerComponent('FetchingFGH', () => menuNavigator);
module.exports = FetchingFGH;
