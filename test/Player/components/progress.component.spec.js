import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'
import {expect} from 'chai';
import Progress from '../../../app/Player/components/progress.component';

describe('Progress', () => {

  let component;

  beforeEach((done) => {
    component = ReactTestUtils.renderIntoDocument(
      <Progress
        elapsed={'50:00'}
        position={500}
        total={1000}
      />
    );
    done();
  });

  it('renders the progress component', () => {
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('shows the right time elapsed', () => {
    const time = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'player__time-elapsed');
    expect(time.textContent).equals('50:00');
  });
});
