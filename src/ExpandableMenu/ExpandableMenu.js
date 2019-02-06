import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import styles from './ExpandableMenu.style';

class ExpandableMenu extends PureComponent {
  state = {
    expanded: false,
    menuItemsVisible: false,
    translationYAnimation: new Animated.Value(0),
  };

  static defaultProps = {
    expandingButton: null,
    menuItems: [],
    expandDuration: 600,
    collapseDuration: 1000,
    displacement: 50,
  };

  static propTypes = {
    expandingButton: PropTypes.number,
    expandDuration: PropTypes.number,
    collapseDuration: PropTypes.number,
    displacement: PropTypes.number,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.number,
      title: PropTypes.string,
      onPress: PropTypes.func,
    })),
  };

  componentDidUpdate(prevProps, prevState) {
    const { expanded } = this.state;

    if (!prevState.expanded && expanded) { // when expand
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ translationYAnimation: new Animated.Value(0), menuItemsVisible: true });
    } else if (prevState.expanded && !expanded) { // when collapse
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ translationYAnimation: new Animated.Value(0) });
    }
  }

  expand = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

  displayMenuItemsAnimation = () => {
    const { translationYAnimation } = this.state;
    const { expandDuration } = this.props;
    Animated.timing(translationYAnimation, {
      toValue: 1,
      duration: expandDuration,
    }).start();
  };

  hideMenuItemsAnimation = () => {
    const { translationYAnimation } = this.state;
    const { collapseDuration } = this.props;
    Animated.timing(translationYAnimation, {
      toValue: 1,
      duration: collapseDuration,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ menuItemsVisible: false });
      }
    });
  };

  displayMenuItems = () => {
    const items = [];
    const { menuItems, displacement } = this.props;
    const from = 0;
    let to = 0;

    menuItems.forEach((item, index) => {
      to -= displacement; // -y displacement for each item menu
      items.push(this.menuItemView(item, index, from, to));
    });

    this.displayMenuItemsAnimation();

    return items;
  };

  hideMenuItems = () => {
    const items = [];
    const { menuItems, displacement } = this.props;
    const to = 0; // collapse to 0 position
    let from = -displacement; // starting from the first menu item

    menuItems.forEach((item, index) => {
      items.push(this.menuItemView(item, index, from, to));
      from -= displacement; // next menu item's position
    });

    this.hideMenuItemsAnimation();

    return items;
  };

  menuItemView = ({ img, title, onPress }, index, from, to) => {
    const { translationYAnimation } = this.state;
    const menuItemOnPress = () => onPress && onPress(index, title);

    // expand animation property
    const translateUp = translationYAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
    });
    const rotateClockwise = translationYAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const tranlateUpStyle = {
      position: 'absolute',
      transform: [{ translateY: translateUp }],
    };
    const rotateClockwiseStyle = {
      position: 'absolute',
      transform: [{ rotate: rotateClockwise }],
    };

    // collapse animation property
    const translateDown = translationYAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [from, to],
    });
    const rotateCounterClockwise = translationYAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
    const tranlateDownStyle = {
      position: 'absolute',
      transform: [{ translateY: translateDown }],
    };
    const rotateCounterClockwiseStyle = {
      position: 'absolute',
      transform: [{ rotate: rotateCounterClockwise }],
    };

    return (
      <Animated.View style={ [tranlateUpStyle, tranlateDownStyle] } key={ index }>
        <TouchableOpacity onPress={ menuItemOnPress }>
          <Animated.Text style={ Platform.OS === 'ios' ? styles.iosMenuTitle : styles.androidMenuTitle }>
            { title }
          </Animated.Text>
          <Animated.Image
            style={ [rotateClockwiseStyle, rotateCounterClockwiseStyle] }
            source={ img }
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const { expandingButton } = this.props;
    const { expanded, menuItemsVisible } = this.state;
    return (
      <View>
        { expanded && this.displayMenuItems() }
        { !expanded && menuItemsVisible && this.hideMenuItems() }
        <TouchableOpacity onPress={ this.expand }>
          <Image source={ expandingButton } />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ExpandableMenu;
