import React     from 'react';
import { Image } from 'react-native';
import styled    from 'styled-components/native';

import UnderConstructionImage from '../../assets/images/under-construction.png'
import theme                  from '../theme.js';

export default class UnderConstruction extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <ConstructionView>
        <ConstructionText color={theme.palette.primaryColor}>
          {'Sorry, but ' + (title ? 'the ' + title + ' page ' : 'this feature ') + 'is still under development...'}
        </ConstructionText>
        <MarginCenter>
          <ConstructionImage source={UnderConstructionImage} alt='under-construction' />
        </MarginCenter>
      </ConstructionView>
    )
  }
}

const ConstructionView = styled.View`
  flex: 1;
  flex-direction: column;
`

const ConstructionText = styled.Text`
  color: ${props => props.color};
  font-size: 22px;

  padding: 25px 50px;
  text-align: center;
`

const ConstructionImage = styled.Image`
  width: 250px;
  height: 250px;
`

const MarginCenter = styled.View`
  margin: auto;
`
