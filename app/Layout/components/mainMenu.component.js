import React, { PureComponent } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


export default class MainMenu extends PureComponent {
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

    return (
      <Menu vertical>
        <HomeLink />
        <SourceLink />
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
