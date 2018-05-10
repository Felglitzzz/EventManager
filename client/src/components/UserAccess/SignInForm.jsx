import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const SignInForm = ({
  onChange, onSubmit, loginData, errors, isLoading, handleFocus
}) => (
  <div
    aria-hidden="true"
    aria-labelledby="exampleModalLabel"
    className="modal fade"
    id="exampleModal"
    role="dialog"
  >
    <div className="modal-dialog"
      role="document">
      <div className="modal-content bg-orange modal-breadth">
        <div className="modal-header">
          <h5 className="modal-title text-light text-center"
            id="exampleModalLabel">
            Sign in
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
              {errors.username && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.username}
                </div>
              )}
              <input
                className="form-control mb-3"
                error={errors.username}
                name="username"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Username"
                type="text"
                value={loginData.username}
              />
              {errors.password && (
                <div className="alert alert-danger"
                  role="alert">
                  {errors.password}
                </div>
              )}
              <input
                className="form-control mb-3"
                error={errors.password}
                name="password"
                onChange={onChange}
                onFocus={handleFocus}
                placeholder="Password"
                type="password"
                value={loginData.password}
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
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};

export default SignInForm;
