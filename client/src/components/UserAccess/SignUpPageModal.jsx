import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../helpers/history';
import { addNewUser } from '../../actions/userAccessActions';
import SignUpForm from './SignUpForm';
import Validate from '../../helpers/validations/Validate';
import Prompter from '../../helpers/Prompter';


/**
 * @description - Container class component for sign in page
 *
 * @class SignUpPageModal
 *
 * @extends {React.Component}
 */
export class SignUpPageModal extends React.Component {
  /**
   * @description - creates an instance of SignUpPageModal
   *
   * @constructor
   *
   * @param { props } props - contains sign up component properties
   */
  constructor(props) {
    super(props);
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
   * @description - handles form input change event
   *
   * @param {object} event
   *
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
   *
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign up details
   *
   * @returns { void }
   */
  handleFocus(event) {
    const field = event.target.name;
    const { errors } = this.state;
    errors[field] = '';
    this.setState({ errors });
  }

  /**
   * @description - handles sign-up form submission
   *
   * @param {object} event
   *
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
        this.setState({ isLoading: false, isAuthenticated: false });
        Prompter.error(error);
      });
  }
  /**
   * @returns {void}
   */
  redirectToDashboard() {
    this.setState({ isLoading: false });
    Prompter.success('Sign Up Successful');
    history.replace('/dashboard');
  }

  /**
   * @description - renders sign-up form
   *
   * @returns {jsx} sign-up modal component
   */
  render() {
    return (
      <div>
        <SignUpForm
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          isLoading={this.state.isLoading}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          userData={this.state.userData}
        />
      </div>
    );
  }
}

SignUpPageModal.propTypes = {
  addNewUser: PropTypes.func.isRequired,
};

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  addNewUser: userData => dispatch(addNewUser(userData))
});

export default connect(null, mapDispatchToProps)(SignUpPageModal);
