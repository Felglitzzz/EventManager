import React from 'react';
/**
 * Class Footer
 */
export default class Footer extends React.Component {
  /**
   * @returns {react} Footer component
   */
  render() {
    return (
      <div>
        <footer className="bg-dark mt-5 h-15 pb-3">
          <div className="container pt-5">
            <ul className="pl-0">
              <li className="d-flex justify-content-center">
                <a className="text-light border-2 border-orange icon facebook mr-1"
                  href="#">
                  <i aria-hidden="true"
                    className="fa fa-facebook" />
                </a>
                <a className="text-light border-2 border-orange icon twitter mr-1"
                  href="#">
                  <i aria-hidden="true"
                    className="fa fa-twitter" />
                </a>
                <a className="text-light border-2 border-orange icon ig mr-1"
                  href="#">
                  <i aria-hidden="true"
                    className="fa fa-instagram" />
                </a>
                <a className="text-light border-2 border-orange icon envelope"
                  href="#">
                  <i aria-hidden="true"
                    className="fa fa-envelope" />
                </a>
              </li>
            </ul>
          </div>
          <div className="container d-flex justify-content-center">
            <h5 className="text-center mb-0 text-light">© 2018 Eventeria. All rights reserved</h5>
          </div>
        </footer>
      </div>
    );
  }
}
