import React from 'react';
import PropTypes from 'prop-types';

const SignInForm = ({ onChange, onSubmit, loginData, errors }) => {
  return (
    <div
        onSubmit={onSubmit}
        className="modal fade"
        id="exampleModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content bg-orange">
                <div className="modal-header">
                    <h5 className="modal-title text-light text-center"
                        id="exampleModalLabel">Sign in
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="text-white" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="modal-body bg-light">
                        <div className="form-group">
                        {/* { errors && <div className="alert alert-danger">{errors}</div> } */}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Username"
                            name="username"
                            value={loginData.username}
                            onChange = {onChange}
                            error = {errors.username}
                            />
                            <div>{ errors.username && <div className="text-danger text-center mb-2">{errors.username}</div>}</div>

                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            name="password"
                            onChange = {onChange}
                            value={loginData.password}
                            error = {errors.password} />
                            <div>{ errors.password && <div className="text-danger text-center mb-2">{errors.password}</div>}</div>

                            
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
                    <div>
                        <p
                            className="text-center text-light"
                            data-toggle="modal"
                            data-target="#exampleModall"
                            >
                            <a className="text-light"
                                data-toggle="modal"
                                data-target="#exampleModall"
                                >
                                <u>Sign Up here</u>
                            </a>
                                if you do not have an account yet.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loginData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default SignInForm;

