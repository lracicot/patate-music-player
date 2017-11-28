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

  it('Is source connexion okay', () => {
    expect(component.isConnecting()).to.equal(false);

    const source = new SoundCloudProxy();
    source.status = 'CONNECTING';
    component = ReactTestUtils.renderIntoDocument(
      <Source
        proxy={source}
        dispatch={() => 0}
      />,
    );

    expect(component.isConnecting()).to.equal(true);
  });

  it('Is button text okay', () => {
    expect(component.getButtonInteraction()).to.equal('Connect');

    const source = new SoundCloudProxy();
    source.status = 'CONNECTED';
    component = ReactTestUtils.renderIntoDocument(
      <Source
        proxy={source}
        dispatch={() => 0}
      />,
    );
    expect(component.getButtonInteraction()).to.equal('Disconnect');

    source.status = 'CONNECTING';
    component = ReactTestUtils.renderIntoDocument(
      <Source
        proxy={source}
        dispatch={() => 0}
      />,
    );
    expect(component.getButtonInteraction()).to.equal('Disconnect');
  });
});
