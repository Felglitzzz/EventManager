import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EventCenterList = ({ centerReturned }) => {
  const { events } = centerReturned;
  return (
    <div className="d-flex justify-content-center text-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date Booked</th>
            <th scope="col">Events Slated</th>
          </tr>
        </thead>
        {events.map((event, id) => (
          <tbody key={id}>
            <tr>
              <td>{moment(event.date).format('dddd, MMMM Do YYYY')}</td>
              <td>{event.name}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

EventCenterList.propTypes = {
  centerReturned: PropTypes.object.isRequired
};

export default EventCenterList;
