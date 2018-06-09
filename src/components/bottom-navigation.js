import React                from 'react';
import { BottomNavigation } from 'react-native-material-ui';

export default class BottomNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: this.props.navigation.state.routes[this.props.navigation.state.index].key
    };
  }

  render() {
    return (
      <BottomNavigation active={this.state.active} hidden={false}>
        <BottomNavigation.Action
          key="Home"
          icon="home"
          onPress={() => {
            this.setState({ active: 'Home' })
            this.props.navigation.navigate('Home')
          } } />
        <BottomNavigation.Action
          key="Work"
          icon="work"
          onPress={() => {
            this.setState({ active: 'Work' })
            this.props.navigation.navigate('Work')
          } } />
        <BottomNavigation.Action
          key="Camera"
          icon="add-a-photo"
          onPress={() => {
            this.setState({ active: 'Camera' })
            this.props.navigation.navigate('Camera')
          } } />
        <BottomNavigation.Action
          key="Messages"
          icon="message"
          onPress={() => {
            this.setState({ active: 'Messages' })
            this.props.navigation.navigate('Messages')
          } } />
        <BottomNavigation.Action
          key="ShoppingCart"
          icon="shopping-cart"
          onPress={() => {
            this.setState({ active: 'ShoppingCart' })
            this.props.navigation.navigate('ShoppingCart')
          } } />
      </BottomNavigation>
    )
  }
}
