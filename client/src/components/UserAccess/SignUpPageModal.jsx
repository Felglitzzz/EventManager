import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';

import history from '../../helpers/history';
import { addNewUser } from '../../actions/userAccessActions';
import SignUpForm from './SignUpForm';
import Validate from '../../helpers/validations/Validate';

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
    const { userData } = this.state;
    userData[field] = event.target.value;
    return this.setState({ userData });
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
    this.setState({ errors });
  }

  /**
   * onSubmit event function
   * @param {object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    const { userData } = this.state;
    const { errors, isValid } = Validate.signUp(userData);

    if (!isValid) {
      this.setState({ errors, isLoading: false });
      return;
    }
    this.setState({ errors: {}, isLoading: true });
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
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          isLoading={this.state.isLoading}
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
const mapStateToProps = state => ({
  userData: state.userAccess
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageModal);
