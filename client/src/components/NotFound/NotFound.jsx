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
   * @param { props } props - contains notfound component properties
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
      <div className="text-center bg-white h-100 fill_screen d-flex align-items-center mx-auto">
        <div className="d-flex align-items-center mx-auto">
          <div>
            <h3 className="fourohfour text-white"><u>404</u></h3>
            <p className="display-4 text-center text-white pt-5">
              Ooops! Sorry, we can't find this page.
            </p>
            { isAuthenticated
              ?
              <Link
                to="/dashboard"><button className="btn btn-white text px-3">Back Home</button>
              </Link>
              :
              <Link
                to="/"><button className="btn btn-white text px-3">Back Home</button>
              </Link>
            }
          </div>
        </div>
      </div>
    );
  }
}
