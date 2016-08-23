import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

var food = [
  {name: 'Lettuce', category: 'Vegetable'},
  {name: 'Apple', category: 'Fruit'},
  {name: 'Orange', category: 'Fruit'},
  {name: 'Potato ', category: 'Vegetable'},
  {name: 'Pork', category: 'Vegetable'},
  {name: 'Carrot ', category: 'Vegetable'},
  {name: 'Kivi', category: 'Fruit'},
  {name: 'Banana', category: 'Fruit'},
  {name: 'NAME', category: 'Different'}
];

class LVWS extends Component {

  constructor() {
    super();
    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.convertFoodToArrayMap())
    };

  }

  convertFoodToArrayMap() {
    var foodCategoryMap = {};
    food.forEach((foodItem) => {
        if (!foodCategoryMap[foodItem.category]) {
          foodCategoryMap[foodItem.category] = [];
        }
      foodCategoryMap[foodItem.category].push(foodItem);
    });

    return foodCategoryMap;

  }

  renderRow(foodItem) {
    return (
      <Text>{foodItem.name}</Text>
    );
  }

  renderSectionHeader(sectionData, category) {
    return (
      <Text style={{fontWeight: 'bold'}}>{category}</Text>
    );
  }

  render() {
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow}
        renderSectionHeader = {this.renderSectionHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LVWS', () => LVWS);
