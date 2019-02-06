import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ExpandableMenu from '../src/ExpandableMenu/ExpandableMenu';

const plus = require('./img/plus.png');
const musicalNote = require('./img/musicalNote.png');
const location = require('./img/location.png');
const camera = require('./img/camera.png');
const pencil = require('./img/pencil.png');
const erasor = require('./img/eraser.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <ExpandableMenu
          expandingButton={ plus }
          menuItems={
            [
              {
                img: musicalNote,
                title: 'music',
                onPress: (index, title) => console.log(index, title),
              },
              {
                img: location,
                title: 'location',
                onPress: (index, title) => console.log(index, title),
              },
              {
                img: camera,
                title: 'camera',
                onPress: (index, title) => console.log(index, title),
              },
              {
                img: pencil,
                title: 'pencil',
                onPress: (index, title) => console.log(index, title),
              },
              {
                img: erasor,
                title: 'erasor',
                onPress: (index, title) => console.log(index, title),
              },
            ]
          }
        />
      </View>
    );
  }
}

