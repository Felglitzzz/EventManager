import React from 'react';
import PropTypes from 'prop-types';

const SignUpForm = ({ onChange, onSubmit, userData, errors }) => {
  return (
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
                            placeholder="Surname"
                            name="surname"
                            value={userData.surname}
                            onChange = {onChange} />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Firstname"
                            name="firstname"
                            onChange = {onChange}
                            value={userData.firstname} />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Username"
                            name="username"
                            value={userData.username}
                            onChange = {onChange} />
                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            name="email"
                            onChange = {onChange}
                            value={userData.email} />
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            name="password"
                            onChange = {onChange}
                            value={userData.password} />
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
                        {/* <button
                            className="btn btn-outline-light text-light border"
                            data-dismiss="modal">
                            Close
                        </button> */}
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
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default SignUpForm;

