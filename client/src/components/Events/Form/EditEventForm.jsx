import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

const EditEventForm = ({
  onChange, onSubmit, updateEventData, errors, options, imageOnChange, isLoading, handleFocus
}) => (
  options.length === 0 || updateEventData.length === 0 ?
    <div className="d-flex justify-content-center pad">
      <Loader
        size={96}
        color1="#f6682f"
        color2="#f6682f"
        color3="#f6682f"
        color4="#f6682f"/>
    </div>
    :
    <div>
      <div className="py-5">
        <div className="form-width mx-auto bg-white z-depth-1 hoverable">
          <header className="shadow-down">
            <p className=" form-head text-center text-orange">Edit Event</p>
          </header>
          <section>
            <div className="img-fluid d-flex justify-content-center mt-5">
              <div className="container">
                <form onSubmit={onSubmit} >
                  <div>
                    <p className="p-3 bg-orange text-light text-center lead">
                      Fill the form to edit event
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="form-group">
                      {errors.name && <div className="alert alert-danger" role="alert">
                        {errors.name}</div>}
                      <input
                        type="name"
                        name="name"
                        className= "form-control"
                        placeholder="Event Name"
                        value={updateEventData.name}
                        onChange={onChange}
                        onFocus={handleFocus}
                      />
                    </div>
                    <div className="form-group">
                      {errors.centerId && <div className="alert alert-danger" role="alert">
                        {errors.centerId}</div>}
                      <select
                        type="name"
                        name="centerId"
                        className="form-control"
                        value={updateEventData.centerId}
                        placeholder="Select Center"
                        onChange={onChange}
                        onFocus={handleFocus} >
                        <option value="">{'Select Center'}</option>
                        {options.map(option =>
                          <option
                            key={option.id}
                            value={option.id}>{option.name}</option>)
                        }
                      </select>
                    </div>
                    <div className="form-group">
                      {errors.date && <div className="alert alert-danger" role="alert">
                        {errors.date}</div>}
                      <input
                        type="date"
                        name="date"
                        className="form-control text-secondary"
                        value={updateEventData.date}
                        placeholder="Event Date"
                        onChange={onChange}
                        onFocus={handleFocus}
                      />
                    </div>
                    <div className="form-group">
                      {errors.time && <div className="alert alert-danger" role="alert">
                        {errors.time}</div>}
                      <input
                        type="time"
                        name="time"
                        className="form-control text-secondary"
                        value={updateEventData.time}
                        placeholder="Event Time"
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
                        placeholder="Event Description"
                        value={updateEventData.description}
                        onChange={onChange}
                        onFocus={handleFocus}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="file"
                        name="image"
                        className="form-control-file text-secondary border"
                        accept="image/*"
                        placeholder="Choose event Image"
                        onChange={imageOnChange}
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
