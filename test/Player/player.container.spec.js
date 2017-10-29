import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import chai, { expect } from 'chai';
import { Player } from '../../app/Player/player.container';


describe('PlayerContainer', () => {
  let component;

  beforeEach((done) => {
    component = ReactTestUtils.renderIntoDocument(
      <Player />,
    );
    done();
  });

  it('renders the player container', () => {
    expect(ReactTestUtils.isDOMComponent(component));
  });
});
