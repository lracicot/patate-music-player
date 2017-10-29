import React, { PureComponent } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default class MainMenu extends PureComponent {
  render() {
    const { activeItem } = this.props;
    return (
      <Menu vertical>
        <Menu.Item name="home" to="/" as={NavLink} active={activeItem === 'home'} >
          Home
        </Menu.Item>

        <Menu.Item to="/sources" as={NavLink} active={activeItem === 'sources'} >
          Music services
        </Menu.Item>

        <Menu.Item>
          <Input icon="search" placeholder="Search song..." />
        </Menu.Item>
      </Menu>
    );
  }
}

MainMenu.propTypes = {
  activeItem: PropTypes.string,
};

MainMenu.defaultProps = {
  activeItem: 'home',
};
