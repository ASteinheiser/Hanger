import React from 'react';

import Favorites from '../favorites.js';

describe('Favorites tests ->', () => {

  describe('Basic tests ->', () => {

    it('renders a favorites page', () => {
      const component = shallow(
        <Favorites />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
