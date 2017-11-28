import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Search from './search.component';


/**
  * mainMenu - This is the main menu
  * @extends PureComponent
  */
export default class mainMenu extends PureComponent {
  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    const { activeItem } = this.props;

    const HomeLink = withRouter(({ history }) => (
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={() => { history.push('/'); }}
      >
        Home
      </Menu.Item>
    ));

    const SourceLink = withRouter(({ history }) => (
      <Menu.Item
        name="home"
        active={activeItem === 'sources'}
        onClick={() => { history.push('/sources'); }}
      >
        Music services
      </Menu.Item>
    ));

    const PlaylistsLink = withRouter(({ history }) => (
      <Menu.Item
        name="home"
        active={activeItem === 'playlists'}
        onClick={() => { history.push('/playlists'); }}
      >
        Playlists
      </Menu.Item>
    ));

    return (
      <Menu vertical>
        <HomeLink />
        <SourceLink />
        <PlaylistsLink />
        <Menu.Item>
          <Search
            onResultSelect={this.props.onResultSelect}
            onSearchChange={this.props.onSearchChange}
            {...this.props}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

mainMenu.propTypes = {
  activeItem: PropTypes.string,
  onResultSelect: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

mainMenu.defaultProps = {
  activeItem: 'home',
};
