# react-native-expandable-menu
react native expandable menu component for ios and android

## Demo
![Alt Text](https://media.giphy.com/media/9V5eBPh4P5M7gFvY5C/giphy.gif)
## Installation
```npm install react-native-expandable-menu```

## Getting started
```
import ExpandableMenu from '../src/ExpandableMenu/ExpandableMenu';
```
import the an images of your choice
```
const plus = require('./img/plus.png');
const musicalNote = require('./img/musicalNote.png');
const location = require('./img/location.png');
const camera = require('./img/camera.png');
const pencil = require('./img/pencil.png');
const erasor = require('./img/eraser.png');
```
create an array of menu items
```
const menuItems = [
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
```
lastly, provide expanding button and menu items
```
export default class App extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <ExpandableMenu
          expandingButton={ plus }
          menuItems
        />
      </View>
    );
  }
}
```

## API
| Props    | Type   | Description    | Default    |
| -------- |:------:|:--------------:|:----------:|
| expandingButton  | img  | button to expand menu items  | null   |
| menuItems | img | list of menu item when toggle on and off | [] |
| expandDuration  | number  | speed when expanding menu items  | 600     |
| collapseDuration | number | speed when collapsing menu items | 1000 |
| displacement | number | space between menu items when expand | 50 |
