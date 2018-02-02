import React from 'react';
import Navbar from '../Navbar/Navbar';
import NavHeader from '../NavHeader/NavHeader';
import AllUserEvents from '../Events/AllUserEvents';
/**
 * class UserDashboard
 */
export default class UserDashboard extends React.Component {
  /**
   * @returns { react } dashboard component
   */
  render() {
    return (
      <div>
        <Navbar />
        <NavHeader />
        <section>
          <div className="container w-100 bg-dark">
            <p className="text-center display-3 montezfont text-orange mt-5 py-2">
                Events
            </p>
          </div>
        </section>
        <AllUserEvents />
      </div>
    );
  }
}
