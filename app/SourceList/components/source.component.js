import React, { PureComponent } from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import SoundCloudProxy from './../../../src/model/SoundCloudProxy';
import SpotifyProxy from './../../../src/model/SpotifyProxy';

class Source extends PureComponent {
  getButtonInteraction() {
    return this.props.proxy.status === 'DISCONNECTED' ? 'Connect' : 'Disconnect';
  }

  render() {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button
            onClick={() => this.props.connectSource(this.props.proxy.name)}
            content={this.getButtonInteraction()}
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
    ],
  ).isRequired,
  connectSource: PropTypes.func.isRequired,
};

export default Source;
