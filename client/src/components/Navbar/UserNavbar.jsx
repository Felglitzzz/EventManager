import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';

import { logOutUser } from '../../actions/userAccessActions';
import getUserInfo from '../../utils/getUserFromToken';
/**
 * Navbar Class
 */
class UserNavbar extends React.Component {
  /**
  * render
  * @returns {Navbar} Navbar component
  */
  render() {
    const { username } = getUserInfo();
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-white d-flex px-5">
          <p className="font-weight-bold montfont text-orange">Dashboard</p>
          <p className="font-weight-bold montfont text-orange ml-auto">
            Hello, {lodash.capitalize(username)}
          </p>
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

/**
 * @param {func} dispatch
 * @returns {object} dipatched action
 */
const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser())
});

export default connect(mapDispatchToProps)(UserNavbar);
