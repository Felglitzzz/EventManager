import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = ({
  onChange, onSubmit, userData, check
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
              <input
                type="text"
                className="form-control mb-3"
                pattern=".{3,}"
                title="Surname should be longer than 3 characters"
                placeholder="Surname"
                name="surname"
                value={userData.surname}
                onChange = {onChange}
                required />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Firstname"
                pattern=".{3,}"
                title="Firstname should be longer than 3 characters"
                name="firstname"
                onChange = {onChange}
                value={userData.firstname}
                required />
              
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                pattern=".{3,}"
                title="Username should be longer than 3 characters"
                name="username"
                value={userData.username}
                onChange = {onChange}
                required />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange = {onChange}
                value={userData.email}
                required />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                pattern="^\S{8,}$"
                title="Password should be longer than 8 characters"
                name="password"
                id="password"
                onChange = {onChange}
                value={userData.password}
                required />

              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="passwordConfirm"
                id="password_confirm"
                onInput={check}
                onChange = {onChange}
                value={userData.passwordConfirm}
                required />
            </div>
          </div>

          <div className="modal-footer bg-orange">
            <button
              className="marg rounded btn text-light btn-outline-light ml-2 border">
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
  check: PropTypes.func.isRequired
};

export default SignUpForm;

