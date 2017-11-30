import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoginActions from './login.actions';

/**
  * Login - A component which show the login page and
  * handle the connexion.
  * @extends Component
  */
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: '',
      passwordValue: '',
    };
  }

  componentWillUpdate(nextProps) {
    if (this.props.accessToken === '' && nextProps.accessToken !== '') {
      this.props.history.push('/player');
    }
  }

  updateUsernameValue(e) {
    this.setState({
      usernameValue: e.target.value,
    });
  }

  updatePasswordValue(e) {
    this.setState({
      passwordValue: e.target.value,
    });
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    const { error, dispatch } = this.props;
    let errorMsg = '';

    if (error !== '') {
      errorMsg = (
        <div className="ui negative message">
          <i className="close icon" />
          <div className="header">
            Error!
          </div>
          <p>{ error }</p>
        </div>);
    }

    return (
      <Form>
        { errorMsg }
        <Form.Field>
          <label>Username</label>
          <input name="username" onChange={e => this.updateUsernameValue(e)} placeholder="username" />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input type="password" onChange={e => this.updatePasswordValue(e)} placeholder="password" />
        </Form.Field>
        <Button
          type="button"
          onClick={() => {
            dispatch(
              LoginActions.login(this.state.usernameValue, this.state.passwordValue),
            );
          }}
        >
        Login
        </Button>
        <Button
          type="button"
          onClick={() => {
            dispatch(
              LoginActions.register(this.state.usernameValue, this.state.passwordValue),
            );
          }}
        >
        Create account
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  accessToken: PropTypes.string,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: '',
  accessToken: '',
};

const mapStateToProps = state => ({
  accessToken: state.get('accessToken'),
  error: state.get('form_error'),
});

const mapDispatchToProps = (dispatch) => {
  const customActions = {
    dispatch,
  };
  return Object.assign(customActions, bindActionCreators(LoginActions, dispatch));
};

export const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
