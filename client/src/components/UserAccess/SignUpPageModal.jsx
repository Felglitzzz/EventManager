import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import validate from '../../helpers/validations/signUpValidate';
import history from '../../helpers/history';
// import bindActionCreators from 'redux';
import { addNewUser } from '../../actions/userAccessActions';
import SignUpForm from './SignUpForm';

/**
 * class SignUpPageModal
 */
class SignUpPageModal extends React.Component {
/**
 * constructor function
 * @param {object} props
 */
  constructor(props) {
    super(props);

    // The Initial State of the form component
    this.state = {
      userData: {
        surname: '',
        firstname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      isAuthenticated: false,
      errors: {},
      isLoading: false
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
    const { userData } = this.state;
    userData[field] = event.target.value;
    return this.setState({ userData });
  }

  /**
   * @returns {object} error or isValid status
   */
  isValid() {
    const { errors, isValid } = validate(this.state.userData);
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
    const { userData } = this.state;
    if (!this.isValid()) {
      return;
    }
    this.props.addNewUser(userData)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
        this.setState({ isLoading: false });
      });
  }
  /**
   * @returns {void}
   */
  redirect() {
    this.setState({ isLoading: false });
    toastr.success('Sign Up Successful');
    history.replace('/dashboard');
  }

  /**
   * @returns {react} sign in modal component
   */
  render() {
    /**
       * @returns {react} component
       */
    return (
      <div>
        < SignUpForm
          userData={this.state.userData}
          errors={this.state.errors}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

SignUpPageModal.propTypes = {
  // actions: PropTypes.object.isRequired
  addNewUser: PropTypes.func.isRequired,
};

/**
 * @param {func} dispatch
 * @returns {object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(userAccessActions, dispatch)
    addNewUser: userData => dispatch(addNewUser(userData))
  };
}

/**
 * @param {object} state
 * @returns {object} userdata
 */
function mapStateToProps(state) {
  return {
    userData: state.userAccess
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageModal);
