import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * class UserEvent
 * @returns {object} react component
 */
const UserEvent = ({ events, handleDelete }) => (
  events.length === 0
    ?
    <div className="d-flex justify-content-center pad">
      <Loader
        size={96}
        color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"/>
    </div>
    :
    events.map((event, id) => {
      localStorage.setItem('events', JSON.stringify(events));
      return (
        <section className="mt-3 mx-3" key={id}>
          <div className="container">
            <div className="row bg-white p-3">
              <div className="col-md-4">
                <div className="img-fluid">
                  <img
                    className="img-fluid"
                    width="400"
                    height="264"
                    src={event.image}
                    alt={event.name}/>
                </div>
              </div>
              <div className="col-md-8">
                <div className="d-flex">
                  <p className="lead text-secondary">{moment(event.date).format('MMMM Do YYYY')}</p>
                  <p className="lead text-secondary ml-auto">{event.time}</p>
                </div>
                <h4 className="card-title list-group-item">{event.name}</h4>
                <p className="card-text list-group-item">{event.center.name}</p>
                <div className= "container pt-2 px-0">
                  <ul className="pl-0">
                    <li className="d-flex justify-content-center">
                      <Link to={`/dashboard/events/${event.id}`}><p className="text-orange border-2 border-orange icon twitter mr-1">
                        <i className="fa fa-pencil"
                          aria-hidden="true" /></p></Link>
                      <a
                        className="text-orange border-2 border-orange icon ig mr-1"
                        onClick={handleDelete}
                        id={event.id}>
                        <i
                          className="fa fa-trash"
                          id={event.id}
                          aria-hidden="true" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
);

UserEvent.propTypes = {
  events: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UserEvent;

