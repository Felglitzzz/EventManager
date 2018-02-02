import React from 'react';
/**
 * class UserEvent
 */
export default class UserEvent extends React.Component {
  /**
   * @returns { react } UserEvent Component
   */
  render() {
    return (
        <section className="my-5">
            <div className="container">
                <div className="row bg-white border border-white shadow p-3">
                    <div className="col-md-4">
                    <div className="img-fluid">
                        <img
                        className="img-fluid"
                        src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg"
                        alt="Event Image" />
                    </div>
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex">
                            <p className="lead text-secondary">
                            Saturday, Dec 10, 2017
                            </p>
                            <p className="lead text-secondary ml-auto">
                            21:00
                            </p>
                        </div>
                            <h4 className="card-title list-group-item">Trade Exhibition Event</h4>
                            <p className="card-text list-group-item">
                            Federal Palace Hotel, Victoria Island
                            </p>
                        <div className= "container pt-2 px-0">
                            <ul className="pl-0">
                                <li className="d-flex justify-content-center">
                                    <a
                                    className="text-orange border-2 border-orange icon twitter mr-1"
                                    data-toggle="modal"
                                    data-target="#exampleModall" >
                                    <i className="fa fa-pencil" aria-hidden="true" /></a>
                                    <a
                                    className="text-orange border-2 border-orange icon ig mr-1">
                                    <i className="fa fa-trash" aria-hidden="true" /></a>
                                    <a
                                    className="text-orange border-2 border-orange icon twitter mr-1"
                                    href="exhibition.html">
                                    <i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}
