import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = ({
  onChange, onSubmit, userData, errors
}) => (
  <div
    className="modal fade"
    id="exampleModall"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content bg-orange">
        <div className="modal-header">
          <h5 className="modal-title text-light text-center"
            id="exampleModalLabel">Sign up
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span className="text-white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body bg-light">
            <div className="form-group">
              <div>{ errors.surname &&
                        <div className="text-danger text-center">{errors.surname}</div>}
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Surname"
                name="surname"
                value={userData.surname}
                onChange = {onChange} />

              <div>{ errors.firstname &&
                        <div className="text-danger text-center">{errors.firstname}</div>}
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Firstname"
                name="firstname"
                onChange = {onChange}
                value={userData.firstname} />

              <div>{ errors.username &&
                        <div className="text-danger text-center">{errors.username}</div>}
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                name="username"
                value={userData.username}
                onChange = {onChange} />

              <div>{ errors.email &&
                        <div className="text-danger text-center">{errors.email}</div>}
              </div>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange = {onChange}
                value={userData.email} />

              <div>{ errors.password &&
                        <div className="text-danger text-center">{errors.password}</div>}
              </div>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                onChange = {onChange}
                value={userData.password} />

              <div>{ errors.confirmPassword &&
                        <div className="text-danger text-center">
                          {errors.confirmPassword}
                        </div>}
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange = {onChange}
                value={userData.confirmPassword} />
            </div>
          </div>
          <div className="modal-footer bg-orange">
            <button
              className="marg rounded btn text-light btn-outline-light ml-2 border"
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
  errors: PropTypes.object.isRequired
};

export default SignUpForm;

