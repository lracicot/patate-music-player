import { JSDOM } from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const { document, window } = (new JSDOM('')).window;

global.document = document;
global.window = window;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
