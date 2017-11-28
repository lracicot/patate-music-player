import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import Controls from '../../../../app/Player/components/controls.component';


describe('Controls', () => {
  let component;
  const backward = () => {};
  const togglePlay = () => {};
  const stop = () => {};
  // const random = () => {};
  const next = () => {};

  beforeEach((done) => {
    component = ReactTestUtils.renderIntoDocument(
      <Controls
        playStatus="PLAYING"
        backward={backward}
        togglePlay={togglePlay}
        stop={stop}
        next={next}
      />,
    );
    done();
  });

  it('renders the details component', () => {
    expect(ReactTestUtils.isDOMComponent(component));
  });

  it('rendrers buttons in the right order', () => {
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].childNodes[0].className).equals('fa fa-backward');
    expect(buttons[1].childNodes[0].className).equals('fa fa-pause');
    expect(buttons[2].childNodes[0].className).equals('fa fa-stop');
    // expect(buttons[3].childNodes[0].className).equals('fa fa-random');
    expect(buttons[3].childNodes[0].className).equals('fa fa-step-forward');
  });

  it('rendrers pause button while playback is playing', () => {
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[1].childNodes[0].className).equals('fa fa-pause');
  });

  it('rendrers play button while playback is paused', () => {
    component = ReactTestUtils.renderIntoDocument(
      <Controls
        playStatus="PAUSED"
        backward={backward}
        togglePlay={togglePlay}
        stop={stop}
        next={next}
      />,
    );
    const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[1].childNodes[0].className).equals('fa fa-play');
  });
});
