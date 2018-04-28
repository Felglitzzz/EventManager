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
   * componentdidmount lifecycle
   * @returns {any} toggles
   */
  componentDidMount() {
    $('#menu-toggle').click((e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      $('.toggle .sidebar #menu li').empty();
      $('.toggle .sidebar #menu li').hide();


      $('.sidebar #menu ul').hide();
    });
  }
  /**
  * render
  * @returns {Navbar} Navbar component
  */
  render() {
    const { username } = getUserInfo();
    return (
      <div className="container mb-3 hoverable">
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
