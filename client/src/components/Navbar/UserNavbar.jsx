import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import { logOutUser } from '../../actions/userAccessActions';
/**
 * Navbar Class
 */
class UserNavbar extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }
  /**
   * @returns {void}
   */

  /**
  * render
  * @returns {Navbar} Navbar component
  */
  render() {
    const { username } = this.props.userInfo;

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-white shadow d-flex px-5">
          <p className="font-weight-bold montfont text-orange">Dashboard</p>
          <p className="font-weight-bold montfont text-orange ml-auto">
            Hello, {lodash.capitalize(username)}</p>
          <button className="navbar-toggler"
            type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
      </div>
    );
  }
}

UserNavbar.propTypes = {
  userInfo: PropTypes.object.isRequired
};
/**
 * @mapStateToProps
 * @description Redux Connect parameter
 * @param {object} state
 * @returns {object} mapped state of redux
 */
function mapStateToProps(state) {
  return {
    userInfo: state.userAccess.loginData.user
  };
}
/**
 * @param {func} dispatch
 * @returns {object} dipatched action
 */
function mapDispatchToProps(dispatch) {
  return {
    userO: () => dispatch(logOutUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
