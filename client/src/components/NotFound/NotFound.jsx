import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description - Class component for 404 page
 *
 * @class NotFound
 *
 * @extends {React.Component}
 */
export default class NotFound extends React.Component {
  /**
   * @description - creates an instance of NotFound
   *
   * @constructor
   *
   * @param { props } props - contains NotFound component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  /**
   * @description - handles removal of modal backdrop before the component mounts
   * and handles authentication for protected route
   *
   * @memberof NotFound
   *
   * @returns {void} Nothing
   */
  componentWillMount() {
    if (localStorage.getItem('x-access-token') === null) {
      return this.setState({ isAuthenticated: false });
    }
    this.setState({ isAuthenticated: true });
  }

  /**
   * @description - renders 404 page
   *
   * @returns {jsx} NotFound component
   */
  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className="w-100">
        <div
          className="text-center bg-white h-100 bloc d-flex justify-items-center mx-auto mt-5 px-5">
          <div className="d-flex align-items-center mx-auto">
            <div className="p-3 z-depth-1 bloc d-flex">
              <img alt="not found image here"
                className="img-fluid d-flex justify-items-left"
                src="http://res.cloudinary.com/felglitz/image/upload/c_scale,h_500/v1527885447/3d_looking_through_lf3jva.jpg" />
              <div>
                <h3 className="fourohfour text-orange pt-2"><u>404</u></h3>
                <h2 className="text-center text-orange py-4">
                    Ooops! Sorry, we can't find this page.
                </h2>
                { isAuthenticated
                  ?
                  <Link
                    to="/dashboard"><button className="btn btn-orange text px-3">Back Home</button>
                  </Link>
                  :
                  <Link
                    to="/"><button className="btn btn-orange text px-3"
                      id="goToHome">Back Home</button>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
