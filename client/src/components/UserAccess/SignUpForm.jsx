import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const SignUpForm = ({
  onChange, onSubmit, userData, errors, handleFocus, isLoading
}) => (
  <div
    aria-hidden="true"
    aria-labelledby="exampleModalLabel"
    className="modal fade"
    id="signupModal"
    role="dialog"
  >
    <div className="modal-dialog"
      role="document">
      <div className="modal-content bg-orange modal-breadth">
        <div className="modal-header">
          <h5 className="modal-title text-light text-center"
            id="exampleModalLabel">
            Sign up
          </h5>
          <button aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button">
            <span aria-hidden="true"
              className="text-white">
              &times;
            </span>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body bg-light">
            <div className="form-group">
              {errors.surname && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.surname}
                </div>
              )}
              <input
                className="form-control mb-3"
                id="surname"
                name="surname"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Surname"
                type="text"
                value={userData.surname}
              />

              {errors.firstname && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.firstname}
                </div>
              )}
              <input
                className="form-control mb-3"
                id="firstname"
                name="firstname"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Firstname"
                type="text"
                value={userData.firstname}
              />

              {errors.username && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.username}
                </div>
              )}
              <input
                className="form-control mb-3"
                id="username"
                name="username"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Username"
                type="text"
                value={userData.username}
              />

              {errors.email && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.email}
                </div>
              )}
              <input
                className="form-control mb-3"
                id="email"
                name="email"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Email"
                type="text"
                value={userData.email}
              />

              {errors.password && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.password}
                </div>
              )}
              <input
                className="form-control mb-3"
                id="password"
                name="password"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Password"
                type="password"
                value={userData.password}
              />

              {errors.passwordConfirm && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.passwordConfirm}
                </div>
              )}
              <input
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Confirm Password"
                type="password"
                value={userData.passwordConfirm}
              />
            </div>
          </div>

          <div className="modal-footer bg-orange">
            {isLoading && (
              <Loader
                color1="#ffffff"
                color2="#ffffff"
                color3="#ffffff"
                color4="#ffffff"
                size={28}
              />
            )}
            <button
              className="marg rounded btn text-light btn-outline-light ml-2 border"
              disabled={isLoading}
              id="signupSubmit"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleFocus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SignUpForm;
