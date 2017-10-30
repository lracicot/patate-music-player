import React, { PureComponent } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
<<<<<<< HEAD
import { withRouter } from 'react-router-dom';
=======
import { NavLink } from 'react-router-dom';
>>>>>>> wip
=======
import { withRouter } from 'react-router-dom';
>>>>>>> add side menu with routing


export default class MainMenu extends PureComponent {
  render() {
    const { activeItem } = this.props;
<<<<<<< HEAD
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
=======
>>>>>>> add side menu with routing

    const HomeLink = withRouter(({ history }) => (
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={() => { history.push('/'); }}
      >
        Home
      </Menu.Item>
    ));

<<<<<<< HEAD
>>>>>>> wip
=======
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
>>>>>>> add side menu with routing
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
