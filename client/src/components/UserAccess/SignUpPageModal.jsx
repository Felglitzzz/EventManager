import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import validate from '../../helpers/validations/userAccessValidate';
import history from '../../helpers/history';
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
        passwordConfirm: ''
      },
      isAuthenticated: false,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.check = this.check.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
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

  check(input) {
    const password = document.getElementById("password");
    const password_confirm = document.getElementById("password_confirm")
    if (password.value !== password_confirm.value) {
        password_confirm.setCustomValidity('Password must match.');
    } else {
        // input is valid -- reset the error message
        password_confirm.setCustomValidity('');
    }
}

  /**
   * onSubmit event function
   * @param {object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { userData } = this.state;
    this.props.addNewUser(userData)
      .then(() => this.redirectToDashboard())
      .catch((error) => {
        toastr.error(error);
        this.setState({ isLoading: false });
      });
  }
  /**
   * @returns {void}
   */
  redirectToDashboard() {
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
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          check={this.check}
        />
      </div>
    );
  }
}

SignUpPageModal.propTypes = {
  addNewUser: PropTypes.func.isRequired,
};

/**
 * @param {func} dispatch
 * @returns {object} action
 */
const mapDispatchToProps = dispatch => ({
    addNewUser: userData => dispatch(addNewUser(userData))
  });

/**
 * @param {object} state
 * @returns {object} userdata
 */
const mapStateToProps = (state) => {
  console.log(state)
  return {
    userData: state.userAccess
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageModal);
