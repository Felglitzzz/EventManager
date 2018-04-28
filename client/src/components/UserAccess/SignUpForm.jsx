import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const SignUpForm = ({
  onChange, onSubmit, userData, errors, handleFocus, isLoading
}) => (
  <div
    className="modal fade"
    id="exampleModall"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content bg-orange modal-breadth">
        <div className="modal-header">
          <h5 className="modal-title text-light text-center" id="exampleModalLabel">
            Sign up
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span className="text-white" aria-hidden="true">
              &times;
            </span>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body bg-light">
            <div className="form-group">
              {errors.surname && (
                <div className="alert alert-danger" role="alert">
                  {errors.surname}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Surname"
                name="surname"
                value={userData.surname}
                onChange={onChange}
                onFocus={handleFocus}
              />

              {errors.firstname && (
                <div className="alert alert-danger" role="alert">
                  {errors.firstname}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Firstname"
                name="firstname"
                onChange={onChange}
                value={userData.firstname}
                onFocus={handleFocus}
              />

              {errors.username && (
                <div className="alert alert-danger" role="alert">
                  {errors.username}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange={onChange}
                onFocus={handleFocus}
              />

              {errors.email && (
                <div className="alert alert-danger" role="alert">
                  {errors.email}
                </div>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={userData.email}
                onFocus={handleFocus}
              />

              {errors.password && (
                <div className="alert alert-danger" role="alert">
                  {errors.password}
                </div>
              )}
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                id="password"
                onChange={onChange}
                value={userData.password}
                onFocus={handleFocus}
              />

              {errors.passwordConfirm && (
                <div className="alert alert-danger" role="alert">
                  {errors.passwordConfirm}
                </div>
              )}
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={onChange}
                value={userData.passwordConfirm}
                onFocus={handleFocus}
              />
            </div>
          </div>

          <div className="modal-footer bg-orange">
            {isLoading && (
              <Loader
                size={28}
                color1="#ffffff"
                color2="#ffffff"
                color3="#ffffff"
                color4="#ffffff"
              />
            )}
            <button
              className="marg rounded btn text-light btn-outline-light ml-2 border"
              disabled={isLoading}
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
