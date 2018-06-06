import React                from 'react';
import { BottomNavigation } from 'react-native-material-ui';

export default class BottomNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null// this.props.navigation.something
    }
  }

  render() {
    return (
      <BottomNavigation active={this.state.active} hidden={false}>
        <BottomNavigation.Action
            key="Pantry"
            icon="kitchen"
            label="Virtual Pantry"
            onPress={() => {
                this.setState({ active: 'Pantry' })
                this.props.navigation.navigate('Pantry')
              }
            }
        />
        <BottomNavigation.Action
           key="Crafting"
           icon="local-dining"
           label="Crafting"
           onPress={() => {
               this.setState({ active: 'Crafting' })
               this.props.navigation.navigate('Recipes')
             }
           }
       />
      </BottomNavigation>
    )
  }
}
