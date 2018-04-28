import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * class UserEvent
 * @returns {object} react component
 */
const UserEvent = ({ events, handleDelete }) =>
  (events.length === 0 ? (
    <div className="d-flex justify-content-center pad">
      <Loader size={96} color1="#f6682f" color2="#f6682f" color3="#f6682f" color4="#f6682f" />
    </div>
  ) : (
    events.map((event, id) => {
      localStorage.setItem('events', JSON.stringify(events));
      return (
        <div className="col-sm-12 col-md-6 col-lg-4 my-2" key={id}>
          <div className="card-deck">
            <div className="card">
              <div className="img-fluid">
                <img
                  className="img-fluid"
                  width="400"
                  height="264"
                  src={event.image}
                  alt={event.name}
                />
              </div>
              <div className="card-body">
                <div className="d-flex">
                  <p className="text-secondary">{moment(event.date).format('MMMM Do YYYY')}</p>
                  <p className="text-secondary ml-auto">{event.time}</p>
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
                            <i className="fa fa-pencil fa-2x p-2" aria-hidden="true" />
                          </p>
                        </Link>
                        <a>
                          <p
                            className="text-orange border-2 border-orange icon-lg ig"
                            onClick={handleDelete}
                            id={event.id}
                          >
                            <i className="fa fa-trash fa-2x p-2" id={event.id} aria-hidden="true" />
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
