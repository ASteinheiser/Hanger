import React from 'react';

import Search from '../search.js';

describe('Search tests ->', () => {

  describe('Basic tests ->', () => {

    it('renders a search page', () => {
      const component = shallow(
        <Search />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
