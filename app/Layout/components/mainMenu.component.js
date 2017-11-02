import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Search from './search.component';

import * as LayoutActions from '../layout.actions';


export default class MainMenu extends PureComponent {
  onResultSelect() {

  }

  onSearchChange() {

  }

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
          <Search
            onResultSelect={this.onResultSelect}
            onSearchChange={this.onSearchChange}
            {...this.props}
          />
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
