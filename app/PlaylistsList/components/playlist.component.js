import React, { PureComponent } from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class PlaylistItem extends PureComponent {
  render() {
    return (
      <List.Item>
        <List.Content>
          {this.props.name}
        </List.Content>
      </List.Item>
    );
  }
}

PlaylistItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PlaylistItem;
