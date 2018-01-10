import React from 'react';
/**
 * class SignUpModal
 */
export default class SignUpModal extends React.Component {
/**
 * constructor function
 * @param {object} props
 */
  constructor(props) {
    super(props);

    // The Initial State of the form component
    this.state = {
      surname: '',
      firstname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * onChange event function
   * @param {object} event
   * @returns {void}
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * onSubmit event function
   * @param {object} event
   * @returns {void}
   */
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  /**
   * @returns {react} sign in modal component
   */
  render() {
    /**
       * @returns {react} component
       */
    return (
        <div>
          <div
            onSubmit={this.onSubmit}
            className="modal fade"
            id="exampleModall"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content bg-orange">
                <div className="modal-header">
                  <h5 className="modal-title text-light text-center"
                  id="exampleModalLabel">Sign up</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body bg-light">
                  <form>
                    <div className="form-group">
                      <label>Surname</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter surname"
                        name="surname"
                        value={this.state.surname}
                        onChange = {this.onChange} />
                      <label>Firstname</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter firstname"
                        name="firstname"
                        onChange = {this.onChange}
                        value={this.state.firstname} />
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        name="username"
                        value={this.state.username}
                        onChange = {this.onChange} />
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        onChange = {this.onChange}
                        value={this.state.email} />
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange = {this.onChange}
                        value={this.state.password} />
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange = {this.onChange}
                        value={this.state.confirmPassword} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-light text-light border"
                  data-dismiss="modal">Close</button>
                  <a><button type="button"
                  className="marg rounded btn text-light btn-outline-light ml-2 border">
                  Submit</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
