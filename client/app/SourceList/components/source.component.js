import React, { PureComponent } from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { toggleSourceConnexion } from '../sourcelist.actions';

import SoundCloudProxy from './../../../src/model/SoundCloudProxy';
import SpotifyProxy from './../../../src/model/SpotifyProxy';
import JamendoProxy from './../../../src/model/JamendoProxy';

/**
 * Source - The source component representing a single source
 * @extends PureComponent
 */
class Source extends PureComponent {
  /**
   * getButtonInteraction - get the text to display in the button
   *
   * @return {string} The text
   */
  getButtonInteraction() {
    return this.props.proxy.status === 'DISCONNECTED' ? 'Connect' : 'Disconnect';
  }

  /**
   * isConnecting - Is the source currently connecting
   *
   * @return {boolean} Is connecting
   */
  isConnecting() {
    return this.props.proxy.status === 'CONNECTING';
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} The rendered component
   */
  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button
            onClick={() => this.props.dispatch(toggleSourceConnexion(this.props.proxy))}
            content={this.getButtonInteraction()}
            loading={this.isConnecting()}
            disabled={this.isConnecting()}
          />
        </List.Content>
        <Image avatar src={this.props.proxy.logo} />
        <List.Content>
          {this.props.proxy.name}
        </List.Content>
      </List.Item>
    );
  }
}

Source.propTypes = {
  proxy: PropTypes.oneOfType(
    [
      PropTypes.instanceOf(SoundCloudProxy),
      PropTypes.instanceOf(SpotifyProxy),
      PropTypes.instanceOf(JamendoProxy),
    ],
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Source;
