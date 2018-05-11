import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loader from 'react-md-spinner';

const EventCenterList = ({ centerEvent }) => (
  !centerEvent ?
    <div className="d-flex justify-content-center pad">
      <Loader
        color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"
        size={96} />
    </div>
    :
    <div className="d-flex justify-content-center text-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col"><p>Date Booked</p></th>
            <th scope="col"><p>Events Slated</p></th>
          </tr>
        </thead>
        {centerEvent.map((event, id) => (
          <tbody key={id}>
            <tr>
              <td><p>{moment(event.startDate).format('dddd, MMMM Do YYYY')}</p></td>
              <td><p>{event.name}</p></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
);

EventCenterList.propTypes = {
  centerEvent: PropTypes.array.isRequired
};

export default EventCenterList;
