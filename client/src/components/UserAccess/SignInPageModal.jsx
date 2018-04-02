import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { loginUser } from '../../actions/userAccessActions';
import Validate from '../../helpers/validations/Validate';
import SignInForm from './SignInForm';
import history from '../../helpers/history';


/**
 * class SignInModal
 */
class SignInPageModal extends React.Component {
  /**
   * construction function
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        username: '',
        password: '',
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
   * onChange event function
   * @param {object} event
   * @returns {void}
   */
  onChange(event) {
    const field = event.target.name;
    const { loginData } = this.state;
    loginData[field] = event.target.value;
    return this.setState({ loginData });
  }

  /**
   * onSubmit event function
   * @param {object} event
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
    this.props.loginUser(loginData)
      .then(() => {
        this.redirectToDashboard();
      })
      .catch(() => {
        this.setState({ isLoading: false, isAuthenticated: false });
      });
  }
  /**
   * @returns {void}
   */
  redirectToDashboard() {
    this.setState({ isLoading: false, isAuthenticated: true });
    toastr.success('Login Successful');
    history.replace('/dashboard');
  }

  /**
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign in details
   *
   * @returns { object } new sign in details state
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
   * @returns {react} sign in modal component
   */
  render() {
    /**
       * @returns {react} sign-in modal component
       */
    return (
      <div>
        < SignInForm
          loginData={this.state.loginData}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
          isLoading={this.state.isLoading}
          handleFocus={this.handleFocus}
        />
      </div>
    );
  }
}

SignInPageModal.propTypes = {
  loginUser: PropTypes.func.isRequired,
};
/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loginData
 */
function mapStateToProps(state) {
  return {
    loginData: state.userAccess.loginData,
  };
}

/**
 * @param {func} dispatch
 * @returns {object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    loginUser: loginData => dispatch(loginUser(loginData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPageModal);
