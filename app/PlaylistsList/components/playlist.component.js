import React, { PureComponent } from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';

import { enqueue, clearQueue } from '../.././Player/player.actions';
import Playlist from './../../../src/model/Playlist';

/**
 * PlaylistItem - Display a playlist in the playlistslist
 * @extends PureComponent
 */
@autobind
class PlaylistItem extends PureComponent {
  /**
   * getDescription - Get the description which is the number of tracks
   *
   * @return {string} the description of the playlist
   */
  getDescription() {
    const size = this.props.playlist.songs.count();
    if (size > 1) {
      return `${size} tracks`;
    }

    return `${size} track`;
  }

  /**
   * handleOnClick - Dispatch actions on a click
   */
  handleOnClick() {
    this.props.dispatch(clearQueue());
    this.props.dispatch(enqueue(this.props.playlist.songs));
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    return (
      <List.Item onClick={this.handleOnClick}>
        <Image avatar src={this.props.playlist.art} />
        <List.Content>
          <List.Header as="a">{this.props.playlist.name}</List.Header>
          <List.Description as="a">{this.getDescription()}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

PlaylistItem.propTypes = {
  playlist: PropTypes.instanceOf(Playlist).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default PlaylistItem;
