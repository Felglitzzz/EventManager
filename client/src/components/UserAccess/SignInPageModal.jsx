import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userAccessActions';
import Validate from '../../helpers/validations/Validate';
import SignInForm from './SignInForm';
import history from '../../helpers/history';
import Prompter from '../../helpers/Prompter';

/**
 * @description - Container class component for sign in page
 *
 * @class SignInPageModal
 *
 * @extends {React.Component}
 */
export class SignInPageModal extends React.Component {
  /**
   * @description - creates an instance of SigninPageModal
   *
   * @constructor
   *
   * @param { props } props - contains sign in component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        username: '',
        password: ''
      },
      isAuthenticated: false,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
  }

  /**
   * @description - handles form input change event
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onChange(event) {
    const field = event.target.name;
    const { loginData } = this.state;
    loginData[field] = event.target.value;
    return this.setState({ loginData });
  }

  /**
   * @description handles on focus event
   *
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign in details
   *
   * @returns { void }
   */
  handleFocus(event) {
    const field = event.target.name;
    const { errors } = this.state;
    errors[field] = '';
    this.setState({
      errors
    });
  }

  /**
   * @description - handles sign-in form submission
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { loginData } = this.state;
    const { errors, isValid } = Validate.login(loginData);

    if (!isValid) {
      this.setState({ errors, isLoading: false });
      return;
    }
    this.setState({ isLoading: true, errors: {} });
    this.props
      .loginUser(loginData)
      .then(() => {
        this.redirectToDashboard();
      })
      .catch((error) => {
        this.setState({ isLoading: false, isAuthenticated: false });
        Prompter.error(error);
      });
  }
  /**
   * @description handles redirect to authenticated dashboard
   *
   * @returns { void }
   */
  redirectToDashboard() {
    this.setState({ isLoading: false, isAuthenticated: true });
    Prompter.success('Login Successful');
    history.replace('/dashboard');
  }

  /**
   * @description - renders sign-in form
   *
   * @returns {jsx} sign-in modal component
   */
  render() {
    return (
      <div>
        <SignInForm
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          isLoading={this.state.isLoading}
          loginData={this.state.loginData}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
function mapDispatchToProps(dispatch) {
  return {
    loginUser: loginData => dispatch(loginUser(loginData))
  };
}

export default connect(null, mapDispatchToProps)(SignInPageModal);
