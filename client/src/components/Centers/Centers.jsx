import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import history from '../../helpers/history';
/**
 * class Centers
 * @returns {object} react component
 */
const Centers = ({ centers }) => (
  centers.length === 0
    ?
    <h6>Loading centers...</h6>
    :
    centers.map((center, id) => (
      <section className="my-5" key={id}>
        <div className="container">
          <div className="row bg-white border border-white shadow p-3">
            <div className="col-md-4">
              <div className="img-fluid">
                <img
                  className="img-fluid"
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg"
                  alt={center.name}/>
              </div>
            </div>
            <div className="col-md-8">
              <div className="d-flex">
                <p className="lead text-secondary">$ {center.price}</p>
                <p className="lead text-secondary ml-auto">{center.capacity} capacity</p>
              </div>
              <h4 className="card-title list-group-item">{center.name}</h4>
              <p className="card-text list-group-item">{center.location}</p>
              <div className= "container pt-2 px-0">
                <ul className="pl-0">
                  <li className="d-flex justify-content-center">
                    <Link to={`/dashboard/centers/${center.id}`} history={history}><p className="text-orange border-2 border-orange icon twitter mr-1">
                      <i className="fa fa-pencil"
                        aria-hidden="true" /></p></Link>
                    <a className="text-orange border-2 border-orange icon ig mr-1">
                      <i className="fa fa-trash"
                        aria-hidden="true" /></a>
                    <Link to ={`/dashboard/view-center/${center.id}`}><p
                      className="text-orange border-2 border-orange icon twitter mr-1" >
                      <i className="fa fa-eye"
                        aria-hidden="true" /></p></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    ))
);
export default Centers;

Centers.propTypes = {
  centers: PropTypes.array.isRequired
};

