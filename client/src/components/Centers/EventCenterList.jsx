import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loader from 'react-md-spinner';

const EventCenterList = ({
  events, handleCancelEvent, handleApproveEvent, approveEventLoading, cancelEventLoading, eventId
}) => {
  events = events.rows;
  return (
    !events ?
      <div className="d-flex justify-content-center pad">
        <Loader
          color1="#f6682f"
          color2="#f6682f"
          color3="#f6682f"
          color4="#f6682f"
          size={96} />
      </div>
      :
      <div className="p-3">
        <div className="row border border-top-2 border-bottom-2 py-2">
          <div className="col-3">
            <p className="mt-3 font-weight-bold">Date Booked</p></div>
          <div className="col-3">
            <p className="mt-3 font-weight-bold">Status</p></div>
          <div className="col-3">
            <p className="mt-3 font-weight-bold">Events Slated</p></div>
          <div className="col-3">
            <p className="mt-3 font-weight-bold">Admin Actions</p></div>
        </div>
        {events.map((event, id) => (
          <div className="row border border-top-2 border-bottom-2 py-2"
            key={id}>
            <div className="col-3"><p className="mt-3">{moment(event.startDate).format('dddd, MMMM Do YYYY')}</p></div>
            <div className="col-3 mt-3">
              <span className="fa-stack">
                { event.status === 'pending' ?
                  <i className="fa fa-circle fa-stack text-orange" />
                  : event.status === 'cancelled' ?
                    <i className="fa fa-circle fa-stack text-danger" />
                    : <i className="fa fa-circle fa-stack text-success" />
                }
              </span>{event.status}</div>
            <div className="col-3"><p className="mt-3">{event.name}</p></div>
            <div className="col-3">
              <button
                className="btn-success mt-3 mr-1 w-60"
                id={event.id}
                name={event.name}
                onClick = {handleApproveEvent}>
                {approveEventLoading && +event.id === +eventId ?
                  <Loader
                    color1="#ffffff"
                    color2="#ffffff"
                    color3="#ffffff"
                    color4="#ffffff"
                    size={20} />
                  :
                  'Accept'
                }
              </button>
              <button
                className="btn-danger w-60"
                id={event.id}
                name={event.name}
                onClick = {handleCancelEvent}>
                {cancelEventLoading && +event.id === +eventId ?
                  <Loader
                    color1="#ffffff"
                    color2="#ffffff"
                    color3="#ffffff"
                    color4="#ffffff"
                    size={20} />
                  :
                  'Cancel'
                }</button>
            </div>
          </div>
        ))}
      </div>
  );
};

EventCenterList.propTypes = {
  events: PropTypes.object.isRequired,
  handleCancelEvent: PropTypes.func.isRequired,
  handleApproveEvent: PropTypes.func.isRequired,
  cancelEventLoading: PropTypes.bool.isRequired,
  approveEventLoading: PropTypes.bool.isRequired
};

export default EventCenterList;
