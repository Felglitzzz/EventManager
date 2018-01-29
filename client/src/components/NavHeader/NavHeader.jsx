import React from 'react';
/**
 * class NavHeader
 */
export default class NavHeader extends React.Component {
  /**
   * @returns { react } dashboard component
   */
  render() {
    return (
      <div>
        <section>
          <div className="container mt-5">
            <ul className="nav nav-tabs d-flex">
              <li className="nav-item">
                <a className="nav-link text-orange active" href="userpage.html">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-orange" href="#center">Centers</a>
              </li>
              <li className="nav-item text-orange ml-auto p-2">
                  <p className="text-orange">Hi, Felix</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}
