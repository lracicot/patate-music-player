import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { List } from 'immutable';

import SoundCloudProxy from '../../../src/model/SoundCloudProxy';
import { SourceList } from '../../../app/SourceList/sourcelist.container';


describe('SourceList', () => {
  it('renders the sourcelist container', () => {
    const component = ReactTestUtils.renderIntoDocument(
      <SourceList
        sources={List()}
        dispatch={() => 0}
      />,
    );
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('Shows the source', () => {
    const source = new SoundCloudProxy();
    const component = ReactTestUtils.renderIntoDocument(
      <SourceList
        sources={List([source])}
        dispatch={() => 0}
      />,
    );

    const div = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'item');
    expect(div.length).to.equal(1);
  });
});
