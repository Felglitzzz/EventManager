import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * onChange event function
   * @param {object} event
   * @returns {void}
   */
  onChange(event) {
    const field = event.target.name;
    let { userData } = this.state;
    userData[field] = event.target.value;
    return this.setState({ userData });
  }

  
  /**
   * onSubmit event function
   * @param {object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.addNewUser(this.state.userData)
      .then(() => {
        history.push('/dashboard');
        // this.setState({ redirect: true, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
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
  addNewUser: PropTypes.func.isRequired
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
 * @param {object} ownProps
 * @returns {object} userdata
 */
function mapStateToProps(state, ownProps) {
  return {
    userData: state.userAccess
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageModal);
