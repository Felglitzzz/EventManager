import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import facilities from '../../../utils/facilities';

const EditCenterForm = ({
  onChange, onSubmit, updateCenterData, errors, handleFocus,
  isLoading, imageOnChange, selectOnChange
}) => (
  <div>
    <div className="py-3">
      <div className="form-width mx-auto z-depth-1 hoverable">
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
                <div className="perd">
                  <div className="form-group">
                    {errors.name && <div className="alert alert-danger"
                      role="alert">
                      {errors.name}</div>}
                    <input
                      className= "form-control"
                      name="name"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Name"
                      type="text"
                      value={updateCenterData.name}
                    />
                  </div>
                  <div className="form-group">
                    {errors.location && <div className="alert alert-danger"
                      role="alert">
                      {errors.location}</div>}
                    <input
                      className="form-control text-secondary"
                      name="location"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Location"
                      type="text"
                      value={updateCenterData.location}
                    />
                  </div>
                  <div className="form-group">
                    {errors.price && <div className="alert alert-danger"
                      role="alert">
                      {errors.price}</div>}
                    <div className="input-group mb-3">
                      <div className="txt-bg">
                        <span className="txt">NGN</span>
                      </div>
                      <input
                        className="form-control text-secondary"
                        name="price"
                        onChange={onChange}
                        onFocus={handleFocus}
                        placeholder="Center's Price"
                        step="500"
                        type="number"
                        value={updateCenterData.price}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    {errors.capacity && <div className="alert alert-danger"
                      role="alert">
                      {errors.capacity}</div>}
                    <input
                      className="form-control text-secondary"
                      min="100"
                      name="capacity"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Capacity"
                      step="100"
                      type="number"
                      value={updateCenterData.capacity}
                    />
                  </div>
                  <div className="form-group">
                    {errors.type && <div className="alert alert-danger"
                      role="alert">
                      {errors.type}</div>}
                    <input
                      className="form-control text-secondary"
                      name="type"
                      onChange={onChange}
                      onFocus={handleFocus}
                      pattern=".{3,}"
                      placeholder="Center's Type"
                      title="Center's type should be longer than 3 characters"
                      type="name"
                      value={updateCenterData.type}
                    />
                  </div>
                  <div className="form-group">
                    {errors.description && <div className="alert alert-danger"
                      role="alert">
                      {errors.description}</div>}
                    <textarea
                      className="form-control form-rounded mb-3"
                      name="description"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Description"
                      rows="3"
                      value={updateCenterData.description}
                    />
                  </div>
                  <div className="form-group">
                    {errors.image && <div className="alert alert-danger"
                      role="alert">
                      {errors.image}</div>}
                    <input
                      accept="image/*"
                      className="form-control-file w-100 text-secondary border"
                      name="image"
                      onChange={imageOnChange}
                      onFocus={handleFocus}
                      placeholder="Choose Center's Image"
                      type="file"
                    />
                  </div>
                  <div className="form-check form-check-inline text-secondary">
                    {errors.facilities && <div className="alert alert-danger"
                      role="alert">
                      {errors.facilities}</div>}
                    { facilities.map((facility, id) =>
                      (<div
                        className="form-check ml-3 px-2 form-check-inline text-secondary"
                        id={id}
                        key={id}
                        onChange={selectOnChange} >
                        <input checked = {updateCenterData.facilities.includes(facility)}
                          className="form-check-input"
                          name="facilities"
                          onChange={selectOnChange}
                          onFocus={handleFocus}
                          type="checkbox"
                          value={facility} />
                        <label
                          className="form-check-label">
                          {facility}
                        </label>
                      </div>))}
                  </div>
                  <div className="form-group">
                    <button className="btn btn-orange w-100 waves-effect z-depth-2"
                      disabled = {!!isLoading}
                      onSubmit={onSubmit}>
                      <span className="pr-4">
                          Submit
                      </span>
                      {isLoading && (
                        <Loader
                          color1="#ffffff"
                          color2="#ffffff"
                          color3="#ffffff"
                          color4="#ffffff"
                          size={24}
                        />
                      )}
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

EditCenterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updateCenterData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  imageOnChange: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func.isRequired,
};

export default EditCenterForm;
