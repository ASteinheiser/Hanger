import React from 'react';

import HeaderText from '../header-text.js';

describe('HeaderText tests ->', () => {

  describe('Basic tests ->', () => {

    it('renders a header text component', () => {
      const component = shallow(
        <HeaderText />
      );
      expect(component.props().size).toEqual('36px');
      expect(component.props().children).toEqual(undefined);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Advanced tests ->', () => {

    it('does not pass props...', () => {
      const component = shallow(
        <HeaderText someprops='hello!'/>
      );
      expect(component.props().someprops).toEqual(undefined);
      expect(component).toMatchSnapshot();
    });

    it('except for the \'small\' prop', () => {
      const component = shallow(
        <HeaderText small={true} />
      );
      expect(component.props().size).toEqual('28px');
      expect(component).toMatchSnapshot();
    });

    it('and the \'text\' prop', () => {
      const component = shallow(
        <HeaderText text={'hello world!'} />
      );
      expect(component.props().children).toEqual('hello world!');
      expect(component).toMatchSnapshot();
    });
  });
});
