import React from 'react';
/**
 * class SignUpModal
 */
export default class SignUpModal extends React.Component {
/**
 *
 * @returns {react} sign in modal component
 */
  render() {
    /**
       * @returns {react} component
       */
    return (
        <div>
                                        {/* Modal for sign up */}
          <div className="modal fade"
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
                      <label>Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1"
                      aria-describedby="emailHelp" placeholder="Enter email" />
                      <label>Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1"
                      placeholder="Password" />
                      <label>Confirm Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1"
                      placeholder="Confirm Password" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-light text-light border"
                  data-dismiss="modal">Close</button>
                  <a href="userpage.html"><button type="button"
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
