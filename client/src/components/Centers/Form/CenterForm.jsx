import React from 'react';
import PropTypes from 'prop-types';

const CenterForm = ({
  onChange, onSubmit, centerData
}) => (
  <div>
    <div className="py-3">
      <div className="form-width mx-auto">
        <header className="shadow-down bg-white">
          <p className=" form-head text-center text-orange">Create Center</p>
        </header>
        <section className="bg-white">
          <div className="img-fluid d-flex justify-content-center mt-3">
            <div className="container">
              <form onSubmit={onSubmit} >
                <div className="pt-3">
                  <p className="p-3 bg-orange text-light text-center lead">
                                        Fill the form to create center
                  </p>
                </div>
                <div className="p-5">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      pattern=".{3,}"
                      title="Name should be longer than 3 characters"
                      className= "form-control"
                      placeholder="Center's Name"
                      value={centerData.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      pattern=".{3,}"
                      title="Location should be longer than 3 characters"
                      name="location"
                      className="form-control text-secondary"
                      value={centerData.location}
                      placeholder="Center's Location"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      min="3"
                      name="facility"
                      className="form-control text-secondary"
                      value={centerData.facility}
                      placeholder="Center's Facility"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      min="1000"
                      step="500"
                      name="price"
                      className="form-control text-secondary"
                      value={centerData.price}
                      placeholder="Center's Price"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      min="100"
                      step="100"
                      name="capacity"
                      className="form-control text-secondary"
                      value={centerData.capacity}
                      placeholder="Center's Capacity"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="name"
                      name="type"
                      pattern=".{3,}"
                      title="Center's type should be longer than 3 characters"
                      className="form-control text-secondary"
                      value={centerData.type}
                      placeholder="Center's Type"
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-rounded mb-3"
                      rows="3"
                      name="description"
                      placeholder="Center's Description"
                      value={centerData.description}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      className="form-control-file text-secondary border"
                      accept="image/*"
                      placeholder="Choose Center's Image"
                      value={centerData.image}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onSubmit={onSubmit}
                      className="btn btn-outline-orange px-5">
                                            Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

CenterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  centerData: PropTypes.object.isRequired
};

export default CenterForm;
