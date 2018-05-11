import React from 'react';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { logOutUser } from '../../actions/userAccessActions';
import getUserInfo from '../../utils/getUserFromToken';

/**
 * @description - Class component for rendering authenticated navbar
 *
 * @class UserNavbar
 *
 * @returns {jsx} jsx - renders UserNavbar component
 */
class UserNavbar extends React.Component {
  /**
  * @description - renders dynamic navbar for authenticated users
  *
  * @returns { jsx } jsx - renders authenticated navbar component
  *
  * @memberof UserNavbar
  */
  render() {
    const { username } = getUserInfo();
    return (
      <div className="no-padding-hr container mb-3 hoverable">
        <nav className="navbar navbar-expand-lg d-flex">
          <p className="font-weight-bold montfont text-orange ml-auto myAuto">
            Hello, {lodash.capitalize(username)}
          </p>
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
