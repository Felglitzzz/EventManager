import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const SignInForm = ({
  onChange, onSubmit, loginData, errors, isLoading, handleFocus
}) => (
  <div
    className="modal fade"
    id="exampleModal"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content bg-orange modal-breadth">
        <div className="modal-header">
          <h5 className="modal-title text-light text-center" id="exampleModalLabel">
            Sign in
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
                value={loginData.username}
                onChange={onChange}
                error={errors.username}
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
                onChange={onChange}
                value={loginData.password}
                error={errors.password}
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

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};

export default SignInForm;
