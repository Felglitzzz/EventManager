import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import facilities from '../../../utils/facilities';

const CenterForm = ({
  onChange, onSubmit, centerData, imageOnChange, isLoading, handleFocus, errors, selectOnChange
}) => (
  <div>
    <div className="py-3">
      <div className="form-width mx-auto z-depth-1 hoverable">
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
                        step="500"
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
                      min="100"
                      name="capacity"
                      onChange={onChange}
                      onFocus={handleFocus}
                      placeholder="Center's Capacity"
                      step="100"
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
                      className="form-control-file text-secondary border"
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
                      disabled = {!!isLoading }
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
