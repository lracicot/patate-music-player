import React, { PureComponent } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Playlist from './../../../src/model/Playlist';

class PlaylistItem extends PureComponent {
  render() {
    return (
      <List.Item>
        <List.Content>
          {this.props.playlist.name}
        </List.Content>
      </List.Item>
    );
  }
}

PlaylistItem.propTypes = {
  playlist: PropTypes.instanceOf(Playlist).isRequired,
};

export default PlaylistItem;
