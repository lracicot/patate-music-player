import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import {expect} from 'chai';
import Footer from '../../../app/Player/components/footer.component';

describe('Footer', () => {
  it('renders the footer', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Footer />
    );
    const div = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

    expect(div.length).to.equal(1);
  });
});
