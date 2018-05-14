import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getUserFromToken from '../../utils/getUserFromToken';

/**
 * class UnitCenter
 *
 * @returns {object} react component
 */
const UnitCenter = ({ centers, handleDelete }) => {
  const { isAdmin } = getUserFromToken();
  centers = centers.rows;
  return (
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
              <div className="card-body p-2">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-2 py-0 border-bottom-0"><h4
                    className="card-title">{center.name}</h4></li>
                  <li className="list-group-item pt-0 pb-2 px-2"><p
                    className="card-text">{center.location}</p></li>
                  <li className="list-group-item d-flex px-2 py-0">
                    <p className="card-text">{center.capacity} capacity</p>
                    <p className=" ml-auto card-text">NGN {center.price}</p>
                  </li>
                </ul>
              </div>
              { isAdmin ? <div className="overlay">
                <div className="user-icons">
                  <div className="container pt-2 px-0">
                    <ul className="pl-0">
                      <li className="d-flex justify-content-center">
                        <Link to={`/dashboard/centers/${center.id}`}>
                          <p className="text-white bg-orange icon-lg mr-1 z-depth-2 z-depth-anim">
                            <i aria-hidden="true"
                              className="fa fa-pencil fa-2x p-2" /></p>
                        </Link>
                        <a>
                          <p
                            className="text-white bg-orange icon-lg mr-1 z-depth-2 z-depth-anim"
                            id={center.id}
                            onClick={handleDelete}
                          >
                            <i aria-hidden="true"
                              className="fa fa-trash fa-2x p-2"
                              id={center.id}
                            />
                          </p>
                        </a>
                        <Link
                          to ={`/dashboard/centers/view/${center.id}`}>
                          <p
                            className="text-white bg-orange icon-lg mr-1 z-depth-2 z-depth-anim" >
                            <i aria-hidden="true"
                              className="fa fa-eye fa-2x p-2" />
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> : (null) }
            </div>
          </div>
        </div>
      );
    })
  );
};
export default UnitCenter;

UnitCenter.propTypes = {
  centers: PropTypes.object.isRequired
};

