import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loader from 'react-md-spinner';

const EventCenterList = ({ centerevent }) => (
  !centerevent ?
    <div className="d-flex justify-content-center pad">
      <Loader
        size={96}
        color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"/>
    </div>
    :
    <div className="d-flex justify-content-center text-center">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date Booked</th>
            <th scope="col">Events Slated</th>
          </tr>
        </thead>
        {centerevent.map((event, id) => (
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

EventCenterList.propTypes = {
  centerevent: PropTypes.array.isRequired
};

export default EventCenterList;