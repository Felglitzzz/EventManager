import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const EditEventForm = ({
  onChange,
  onSubmit,
  updateEventData,
  errors,
  options,
  imageOnChange,
  isLoading,
  handleFocus
}) =>
  (options.length === 0 || updateEventData.length === 0 ? (
    <div className="d-flex justify-content-center pad">
      <Loader color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"
        size={96} />
    </div>
  ) : (
    <div>
      <div className="py-5">
        <div className="form-width mx-auto bg-white z-depth-1 hoverable">
          <header className="shadow-down">
            <p className=" form-head text-center text-orange">Edit Event</p>
          </header>
          <section>
            <div className="img-fluid d-flex justify-content-center mt-5">
              <div className="container">
                <form onSubmit={onSubmit}>
                  <div>
                    <p className="p-3 bg-orange text-light text-center lead">
                      Fill the form to edit event
                    </p>
                  </div>
                  <div className="perd">
                    <div className="form-group">
                      <label>Event name</label>
                      {errors.name && (
                        <div className="alert alert-danger"
                          role="alert">
                          {errors.name}
                        </div>
                      )}
                      <input
                        className="form-control text-secondary"
                        name="name"
                        onChange={onChange}
                        onFocus={handleFocus}
                        placeholder="Event Name"
                        type="name"
                        value={updateEventData.name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Center</label>
                      {errors.centerId && (
                        <div className="alert alert-danger"
                          role="alert">
                          {errors.centerId}
                        </div>
                      )}
                      <select
                        className="form-control text-secondary"
                        name="centerId"
                        onChange={onChange}
                        onFocus={handleFocus}
                        placeholder="Select Center"
                        type="name"
                        value={updateEventData.centerId}
                      >
                        <option value="">{'Select Center'}</option>
                        {options.map(option => (
                          <option key={option.id}
                            value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-6">
                        <label>Start Date</label>
                        {errors.startDate && (
                          <div className="alert alert-danger"
                            role="alert">
                            {errors.startDate}
                          </div>
                        )}
                        <input
                          className="form-control text-secondary"
                          name="startDate"
                          onChange={onChange}
                          onFocus={handleFocus}
                          placeholder="Event Start Date"
                          type="date"
                          value={updateEventData.startDate}
                        />
                      </div>
                      <div className="form-group col-sm-12 col-md-6">
                        <label>End Date</label>
                        {errors.endDate && (
                          <div className="alert alert-danger"
                            role="alert">
                            {errors.endDate}
                          </div>
                        )}
                        <input
                          className="form-control text-secondary"
                          name="endDate"
                          onChange={onChange}
                          onFocus={handleFocus}
                          placeholder="Event End Date"
                          type="date"
                          value={updateEventData.endDate}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Choose Event Image</label>
                      <input
                        accept="image/*"
                        className="form-control-file text-secondary w-100 border"
                        name="image"
                        onChange={imageOnChange}
                        placeholder="Choose event Image"
                        type="file"
                      />
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
  ));

EditEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updateEventData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired,
  imageOnChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};

export default EditEventForm;
