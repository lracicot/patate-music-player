import React, { PureComponent } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { withRouter } from 'react-router-dom';
=======
import { NavLink } from 'react-router-dom';
>>>>>>> wip


export default class MainMenu extends PureComponent {
  render() {
    const { activeItem } = this.props;
<<<<<<< HEAD

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

    return (
      <Menu vertical>
        <HomeLink />
        <SourceLink />
=======
    return (
      <Menu vertical>
        <Menu.Item name="home" to="/" as={NavLink} active={activeItem === 'home'} >
          Home
        </Menu.Item>

        <Menu.Item to="/sources" as={NavLink} active={activeItem === 'sources'} >
          Music services
        </Menu.Item>

>>>>>>> wip
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
