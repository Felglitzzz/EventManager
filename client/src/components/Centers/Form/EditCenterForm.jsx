import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const EditCenterForm = ({
  onChange, onSubmit, updateCenterData, errors, handleFocus, isLoading, imageOnChange
}) => (
  <div>
    <div className="py-3">
      <div className="form-width mx-auto">
        <header className="shadow-down bg-white">
          <p className=" form-head text-center text-orange">Edit Center</p>
        </header>
        <section className="bg-white">
          <div className="img-fluid d-flex justify-content-center mt-3">
            <div className="container">
              <form onSubmit={onSubmit} >
                <div className="pt-3">
                  <p className="p-3 bg-orange text-light text-center lead">
                                        Fill the form to edit center
                  </p>
                </div>
                <div className="p-5">
                  <div className="form-group">
                    {errors.name && <div className="alert alert-danger" role="alert">
                      {errors.name}</div>}
                    <input
                      type="text"
                      name="name"
                      className= "form-control"
                      placeholder="Center's Name"
                      value={updateCenterData.name}
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.location && <div className="alert alert-danger" role="alert">
                      {errors.location}</div>}
                    <input
                      type="text"
                      name="location"
                      className="form-control text-secondary"
                      value={updateCenterData.location}
                      placeholder="Center's Location"
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.facility && <div className="alert alert-danger" role="alert">
                      {errors.facility}</div>}
                    <input
                      type="text"
                      min="3"
                      name="facility"
                      className="form-control text-secondary"
                      value={updateCenterData.facility}
                      placeholder="Center's Facility"
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.price && <div className="alert alert-danger" role="alert">
                      {errors.price}</div>}
                    <input
                      type="number"
                      min="1000"
                      step="500"
                      name="price"
                      className="form-control text-secondary"
                      value={updateCenterData.price}
                      placeholder="Center's Price"
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.capacity && <div className="alert alert-danger" role="alert">
                      {errors.capacity}</div>}
                    <input
                      type="number"
                      min="100"
                      step="100"
                      name="capacity"
                      className="form-control text-secondary"
                      value={updateCenterData.capacity}
                      placeholder="Center's Capacity"
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.type && <div className="alert alert-danger" role="alert">
                      {errors.type}</div>}
                    <input
                      type="name"
                      name="type"
                      pattern=".{3,}"
                      title="Center's type should be longer than 3 characters"
                      className="form-control text-secondary"
                      value={updateCenterData.type}
                      placeholder="Center's Type"
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.description && <div className="alert alert-danger" role="alert">
                      {errors.description}</div>}
                    <textarea
                      className="form-control form-rounded mb-3"
                      rows="3"
                      name="description"
                      placeholder="Center's Description"
                      value={updateCenterData.description}
                      onChange={onChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    {errors.image && <div className="alert alert-danger" role="alert">
                      {errors.image}</div>}
                    <input
                      type="file"
                      name="image"
                      className="form-control-file text-secondary border"
                      accept="image/*"
                      placeholder="Choose Center's Image"
                      onChange={imageOnChange}
                      onFocus={handleFocus}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      onSubmit={onSubmit}
                      className="btn btn-outline-orange px-5">
                            Submit
                    </button>
                    { isLoading && <Loader
                      className="ml-3"
                      size={28}
                      color1="#f6682f"
                      color2="#f6682f"
                      color3="#f6682f"
                      color4="#f6682f"
                    />}
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

EditCenterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updateCenterData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  imageOnChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired
};

export default EditCenterForm;
