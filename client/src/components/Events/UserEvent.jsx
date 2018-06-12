import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';


/**
 * @description - Stateless component for rendering events that belong to a user
 *
 * @param { object } events - events that will be rendered
 * @param { func } handleDelete - handles delete event for an event
 *
 * @returns {jsx} UserEvent - Rendered view
 */
const UserEvent = ({ events, handleDelete }) => {
  events = events.rows;
  return (
    events.map((event, id) => (
      <div className="col-sm-12 col-md-6 col-lg-4 my-2"
        id="userevent"
        key={id}>
        <div className="card-deck">
          <div className="card">
            <div className="img-fluid deck">
              <img
                alt={event.name}
                className="img-fluid deck"
                height="264"
                src={event.image}
                width="400"
              />
            </div>
            <div className="card-body">
              <div className="d-flex">
                <p className="text-secondary">{moment(event.startDate).format('MMMM Do YYYY')}</p>
              </div>
              <hr className="my-1" />
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text">{event.center.name}</p>
            </div>
            <div className="stat text-white">
              <span className="fa-stac pl-1">
                { event.status === 'pending' ?
                  <i className="fa fa-circle fa-stack text-orange" />
                  : event.status === 'cancelled' ?
                    <i className="fa fa-circle fa-stack text-danger" />
                    : <i className="fa fa-circle fa-stack text-success" />
                }
              </span>{event.status}
            </div>
            <div className="overlay">
              <div className="user-icons">
                <div className="container pt-2 px-0">
                  <ul className="pl-0">
                    <li className="d-flex justify-content-center">
                      <Link
                        id="editEventButton"
                        to={`/dashboard/events/${event.id}`}>
                        <p className="text-white bg-orange icon-lg mr-1 z-depth-2 z-depth-anim">
                          <i aria-hidden="true"
                            className="fa fa-pencil fa-2x p-2" />
                        </p>
                      </Link>
                      <a
                        id="deleteEventButton">
                        <p
                          className="text-white bg-orange icon-lg mr-1 z-depth-2 z-depth-anim"
                          id={event.id}
                          onClick={handleDelete}
                        >
                          <i aria-hidden="true"
                            className="fa fa-trash fa-2x p-2"
                            id={event.id} />
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

UserEvent.propTypes = {
  events: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default UserEvent;
