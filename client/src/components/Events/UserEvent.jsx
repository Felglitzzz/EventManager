import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import history from '../../helpers/history';
/**
 * class UserEvent
 * @returns {object} react component
 */
const UserEvent = ({ events }) => (
  events.length === 0
    ?
    <h6>Loading events...</h6>
    :
    events.map((event, id) => (
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
                    <Link to={`/dashboard/events/${event.id}`} history={history}><p className="text-orange border-2 border-orange icon twitter mr-1">
                      <i className="fa fa-pencil"
                        aria-hidden="true" /></p></Link>
                    <a className="text-orange border-2 border-orange icon ig mr-1">
                      <i className="fa fa-trash"
                        aria-hidden="true" /></a>
                    <a
                      className="text-orange border-2 border-orange icon twitter mr-1" >
                      <i className="fa fa-ellipsis-h"
                        aria-hidden="true" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    ))
);
export default UserEvent;

UserEvent.propTypes = {
  events: PropTypes.array.isRequired
};

