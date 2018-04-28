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
                <a href="#" className="text-light border-2 border-orange icon facebook mr-1">
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
                <a href="#" className="text-light border-2 border-orange icon twitter mr-1">
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
                <a href="#" className="text-light border-2 border-orange icon ig mr-1">
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
                <a href="#" className="text-light border-2 border-orange icon envelope">
                  <i className="fa fa-envelope" aria-hidden="true" />
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
