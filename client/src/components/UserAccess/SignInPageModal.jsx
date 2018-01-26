import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import validate from '../../helpers/validations/error';
import { loginUser } from '../../actions/userAccessActions';
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
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  /**
   * onChange event function
   * @param {object} event
   * @returns {void}
   */
  onChange(event) {
    const field = event.target.name;
    let { loginData } = this.state;
    loginData[field] = event.target.value;
    return this.setState({ loginData });
  }
  /**
   * @returns {object} error or isValid status
   */
  isValid() {
    const { errors, isValid } = validate(this.state.loginData);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * onSubmit event function
   * @param {object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { loginData } = this.state;
    if (!this.isValid()) {
      return;
    }
    this.setState({ saving: true, errors: {} });
    this.props.loginUser(loginData)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }
  /**
   * @returns {void}
   */
  redirect() {
    this.setState({ saving: false });
    toastr.success('Login Successful');
    history.push('/dashboard');
  }


  // if (this.isValid()) {
  //   this.setState({ errors: {}, isLoading: true });
  //   this.props.loginUser(loginData);
  // }

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
function mapStateToProps(state, ownProps) {
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
    // actions: bindActionCreators(userAccessActions, dispatch)
    loginUser: loginData => dispatch(loginUser(loginData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPageModal);
