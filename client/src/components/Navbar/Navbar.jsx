import React from 'react';

// import SignIn from '../Signin/Signin';
import SignInModal from '../Modal/SIgnInModal';
import SignUpModal from '../Modal/SIgnUpModal';
/**
 * Navbar Class
 */
export default class NavBar extends React.Component {
  /**
  * Nav
  * @returns {Navbar} Navbar component
  */
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg transparent navbar-dark bg-orange">
          <a className="navbar-brand font-weight-bold text-white montfont">EVENTMANAGER</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline ml-auto mx-2">
              <button className="btn-resp-height btn btn-outline-orange-1 rounded-0 px-3 ml-2 border" data-toggle="modal" data-target="#exampleModal" type="button"><i className="fa fa-user" aria-hidden="true"> Sign In</i></button>
            </form>
            <form className="form-inline">
              <button className="btn-resp-height btn btn-outline-orange-1 rounded-0 px-3 ml-2 border" data-toggle="modal" data-target="#exampleModall" type="button"><i className="fa fa-user-plus" aria-hidden="true"> Sign Up</i></button>
            </form>
          </div>
        </nav>
                              { /* Modal for sign in */ }
        < SignInModal />

                              {/* Modal for sign up */}
        < SignUpModal />
      </div>
    );
  }
}
