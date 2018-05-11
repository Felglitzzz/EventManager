import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * @description - Stateless class component for individual events
 *
 * @param {events} event object
 *
 * @param {handleDelete} delete function
 *
 * @returns {event} userevent object
 */
const UserEvent = ({ events, handleDelete }) =>
  (events.length === 0 ? (
    <div className="d-flex justify-content-center pad">
      <Loader color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"
        size={96} />
    </div>
  ) : (
    events.map((event, id) => {
      localStorage.setItem('events', JSON.stringify(events));
      return (
        <div className="col-sm-12 col-md-6 col-lg-4 my-2"
          key={id}>
          <div className="card-deck">
            <div className="card">
              <div className="img-fluid">
                <img
                  alt={event.name}
                  className="img-fluid"
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
              <div className="overlay">
                <div className="user-icons">
                  <div className="container pt-2 px-0">
                    <ul className="pl-0">
                      <li className="d-flex justify-content-center">
                        <Link to={`/dashboard/events/${event.id}`}>
                          <p className="text-orange border-2 border-orange icon-lg twitter">
                            <i aria-hidden="true"
                              className="fa fa-pencil fa-2x p-2" />
                          </p>
                        </Link>
                        <a>
                          <p
                            className="text-orange border-2 border-orange icon-lg ig"
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
      );
    })
  ));

UserEvent.propTypes = {
  events: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default UserEvent;
