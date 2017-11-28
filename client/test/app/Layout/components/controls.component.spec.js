import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import Search from '../../../../app/Layout/components/search.component';


describe('Search', () => {
  let component;

  beforeEach((done) => {
    component = ReactTestUtils.renderIntoDocument(
      <Search />,
    );
    done();
  });

  it('renders the search component', () => {
    expect(ReactTestUtils.isDOMComponent(component));
  });
});
