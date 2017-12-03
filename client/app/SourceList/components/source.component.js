import React, { PureComponent } from 'react';
import { Button, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Source - The source component representing a single source
 * @extends PureComponent
 */
class Source extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnecting: false,
      isDisconnecting: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      isDisconnecting,
      isConnecting,
    } = this.state;

    if (isDisconnecting && !nextProps.isConnected) {
      this.setState({ isDisconnecting: false });
    }

    if (isConnecting && nextProps.isConnected) {
      this.setState({ isConnecting: false });
    }
  }

  connect(name) {
    this.setState({ isConnecting: true });
    this.props.connect(name, this.props.accessToken);
  }

  disconnect(sourceId) {
    this.setState({ isDisconnecting: true });
    this.props.disconnect(sourceId, this.props.accessToken);
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} The rendered component
   */
  render() {
    const {
      logo,
      name,
      isConnected,
      sourceId,
    } = this.props;
    const {
      isDisconnecting,
      isConnecting,
    } = this.state;

    let button;

    if (isConnected) {
      button = (
        <Button
          onClick={() => { this.disconnect(sourceId); }}
          content="DISCONNECT"
          loading={isDisconnecting}
          disabled={isDisconnecting}
        />
      );
    } else {
      button = (
        <Button
          onClick={() => { this.connect(name); }}
          content="CONNECT"
          loading={isConnecting}
          disabled={isConnecting}
        />
      );
    }

    return (
      <List.Item>
        <List.Content floated="right">
          {button}
        </List.Content>
        <Image avatar src={logo} />
        <List.Content>
          {name}
        </List.Content>
      </List.Item>
    );
  }
}

Source.propTypes = {
  disconnect: PropTypes.func.isRequired,
  connect: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isConnected: PropTypes.bool.isRequired,
  sourceId: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default Source;
