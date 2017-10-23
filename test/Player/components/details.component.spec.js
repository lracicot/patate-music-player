import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import {expect} from 'chai';
import Details from '../../../app/Player/components/details.component';

describe('Details', () => {

  it('renders the details component', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Details title="Our lord and savior Satan" />
    );

    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('shows the song title', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <Details title="Our lord and savior Satan" />
    );
    const h3 = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'h3')[0];

    expect(h3.textContent).to.equal("Our lord and savior Satan");
  });
});
