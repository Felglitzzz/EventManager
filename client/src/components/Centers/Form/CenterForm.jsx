import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import facilities from '../../../utils/facilities';

/**
 * @description - Stateless component for rendering form for creating center
 *
 * @param {func} onChange - handles onchange event for edit event form
 * @param {func} onSubmit - handles onSubmit event for edit event form
 * @param {func} handleFocus - handles clearing of input values for edit event form
 * @param {func} imageOnChange - handles onchange event for image input in edit event form
 * @param {object} centerData - center details to be created
 * @param {object} errors - object with input errors
 * @param {func} selectOnChange - handles onchange event for facilities in create center form
 * @param {boolean} isLoading boolean
 *
 * @returns {jsx} CenterForm - Rendered view
 */
const CenterForm = ({
  onChange,
  onSubmit,
  handleFocus,
  imageOnChange,
  centerData,
  errors,
  selectOnChange,
  isLoading
}) => (
  <div>
    <div className="py-3">
      <div className="form-width mx-auto z-depth-1 hoverable bg-white">
        <header
          className="shadow-down bg-white"
          id="createcenterform">
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
                <div className="perd">
                  <div className="form-group">
                    {errors.name && <div className="alert alert-danger"
                      role="alert">
                      {errors.name}</div>}
                    <input
                      className= "form-control text-secondary"
                      name="name"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Name"
                      type="text"
                      value={centerData.name}
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
                      value={centerData.location}
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
                        type="number"
                        value={centerData.price}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    {errors.capacity && <div className="alert alert-danger"
                      role="alert">
                      {errors.capacity}</div>}
                    <input
                      className="form-control text-secondary"
                      name="capacity"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Capacity"
                      type="number"
                      value={centerData.capacity}
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
                      placeholder="Center's Type"
                      title="Center's type should be longer than 3 characters"
                      type="name"
                      value={centerData.type}
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
                      value={centerData.description}
                    />
                  </div>
                  <div className="form-group">
                    {errors.image && <div className="alert alert-danger"
                      role="alert">
                      {errors.image}</div>}
                    <input
                      accept="image/*"
                      className="form-control-file w-100 text-secondary border"
                      id="file-upload"
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
                        key={id}
                        onChange={selectOnChange} >
                        <input className="form-check-input"
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
                      id="createCenterSubmit"
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

CenterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  centerData: PropTypes.object.isRequired,
  imageOnChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleFocus: PropTypes.func.isRequired,
  selectOnChange: PropTypes.func.isRequired
};

export default CenterForm;
