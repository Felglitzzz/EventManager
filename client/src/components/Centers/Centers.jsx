import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from 'react-md-spinner';
import getUserFromToken from '../../utils/getUserFromToken';

/**
 * class Centers
 * @returns {object} react component
 */
const Centers = ({ centers }) => {
  const { isAdmin } = getUserFromToken;
  return (
    centers.length === 0
      ?
      <div className="d-flex justify-content-center pad">
        <Loader
          color1="#f6682f"
          color2="#f6682f"
          color3="#f6682f"
          color4="#f6682f"
          size={96} />
      </div>
      :
      centers.map((center, id) => {
        localStorage.setItem('centers', JSON.stringify(centers));
        return (

          <div className="col-sm-12 col-md-6 col-lg-4 my-2"
            key={id}>
            <div className="card-deck">
              <div className="card">
                <div className="img-fluid">
                  <img
                    alt={center.name}
                    className="img-fluid"
                    height="264"
                    src= {center.image}
                    width="400" />
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><h4
                      className="card-title">{center.name}</h4></li>
                    <li
                      className="list-group-item"><p
                        className="card-text">{center.location}</p></li>
                    <li className="list-group-item d-flex">
                      <p className="card-text">{center.capacity} capacity</p>
                      <p className=" ml-auto card-text">NGN {center.price}</p>
                    </li>
                  </ul>
                </div>
                { !isAdmin ? null : <div className="overlay">
                  <div className="user-icons">
                    <div className="container pt-2 px-0">
                      <ul className="pl-0">
                        <li className="d-flex justify-content-center">
                          <Link to={`/dashboard/centers/edit/${center.id}`}>
                            <p className="text-orange border-2 border-orange icon-lg twitter mr-1">
                              <i aria-hidden="true"
                                className="fa fa-pencil fa-2x p-2" /></p>
                          </Link>
                          {/* <a className="text-orange border-2 border-orange icon-lg ig mr-1">
                          <i aria-hidden="true"
                            className="fa fa-trash fa-2x p-2" />
                        </a> */}
                          <Link to ={`/dashboard/centers/view/${center.id}`}>
                            <p
                              className="text-orange border-2 border-orange icon-lg twitter mr-1" >
                              <i aria-hidden="true"
                                className="fa fa-eye fa-2x p-2" />
                            </p>
                          </Link>
                          {/* <a>
                          <p
                            className="text-orange border-2 border-orange icon-lg ig mr-1"
                            onClick={handleDelete}
                            id={event.id}
                          >
                            <i className="fa fa-trash fa-2x p-2" id={event.id} aria-hidden="true" />
                          </p>
                        </a> */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> }
              </div>
            </div>
          </div>
        );
      })
  );
};
export default Centers;

Centers.propTypes = {
  centers: PropTypes.array.isRequired
};

