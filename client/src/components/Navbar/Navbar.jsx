import React from 'react';

import { Link } from 'react-router-dom';

import SignInPageModal from '../UserAccess/SignInPageModal';
import SignUpPageModal from '../UserAccess/SignUpPageModal';

/**
 * @description - Stateless component for rendering navbar
 *
 * @returns {jsx} jsx - renders Navbar component
 */
const Navbar = () => (
  <div>
    <nav className="navbar navbar-expand-lg transparent navbar-dark bg-orange">
      <Link className="navbar-brand font-weight-bold text-white"
        to="/"
      ><i className="text-center fab fa-quinscape fa-2x mr-2" />
          EVENTERIA
      </Link>
      <button
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#navbarSupportedContent"
        data-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <form className="form-inline ml-auto mx-2">
          <button
            className="btn-resp-height btn btn-outline-orange-1 rounded-0 px-3 ml-2 border"
            data-target="#signinModal"
            data-toggle="modal"
            type="button"
          >
            <i aria-hidden="true"
              className="fa fa-user"
            >
              {' '}
                Sign In
            </i>
          </button>
        </form>
        <form className="form-inline">
          <button
            className="btn-resp-height btn btn-outline-orange-1 rounded-0 px-3 ml-2 border"
            data-target="#signupModal"
            data-toggle="modal"
            type="button"
          >
            <i aria-hidden="true"
              className="fa fa-user-plus"
            >
              {' '}
                Sign Up
            </i>
          </button>
        </form>
      </div>
    </nav>

    {/* Modal for sign in */}
    <SignInPageModal />

    {/* Modal for sign up */}
    <SignUpPageModal />
  </div>
);

export default Navbar;
