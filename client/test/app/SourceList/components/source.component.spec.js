import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';


import SoundCloudProxy from '../../../../src/model/SoundCloudProxy';
import Source from '../../../../app/SourceList/components/source.component';


describe('Source', () => {
  let component;

  beforeEach((done) => {
    const source = new SoundCloudProxy();
    component = ReactTestUtils.renderIntoDocument(
      <Source
        proxy={source}
        dispatch={() => 0}
      />,
    );
    done();
  });

  it('renders the source component', () => {
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('renders the button of the source', () => {
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(1);
  });
});
