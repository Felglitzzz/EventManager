import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'react-md-spinner';

import history from '../../helpers/history';
/**
 * class Centers
 * @returns {object} react component
 */
const Centers = ({ centers }) => (
  centers.length === 0
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
    centers.map((center, id) => {
      localStorage.setItem('centers', JSON.stringify(centers));
      return (
        <section className="my-5" key={id}>
          <div className="container">
            <div className="row bg-white border border-white shadow p-3">
              <div className="col-md-4">
                <div className="img-fluid">
                  <img
                    className="img-fluid"
                    width="400"
                    height="264"
                    src= {center.image}
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
                      <Link to={`/dashboard/centers/edit/${center.id}`} history={history}><p className="text-orange border-2 border-orange icon twitter mr-1">
                        <i className="fa fa-pencil"
                          aria-hidden="true" /></p></Link>
                      <a className="text-orange border-2 border-orange icon ig mr-1">
                        <i className="fa fa-trash"
                          aria-hidden="true" /></a>
                      <Link to ={`/dashboard/center/view/${center.id}`}><p
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
      );
    })
);
export default Centers;

Centers.propTypes = {
  centers: PropTypes.array.isRequired
};

