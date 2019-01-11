import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HomePage from '../components/pages/HomePage'

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {

  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  it('add 1+1',()=>{
    expect(1+1).toBe(2);
  });

  it('should have the `h1` "HomePage"', () => {

	expect(
		wrapper.contains(<h1>HomePage</h1>)
	).toBe(true);

	});


});