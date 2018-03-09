import React from 'react';
import PropTypes from 'prop-types';

const EditEventForm = ({
  onChange, onSubmit, updateEventData, errors, options
}) => (
  <div>
    <div className="py-5">
      <div className="form-width mx-auto bg-white">
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
                    <input
                      type="name"
                      name="name"
                      className= "form-control"
                      placeholder="Event Name"
                      value={updateEventData.name}
                      onChange={onChange}
                      required
                    />
                    { errors.name &&
                                <div>{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <select
                      type="name"
                      name="centerId"
                      className="form-control"
                      value={updateEventData.centerId}
                      placeholder="Select Center"
                      onChange={onChange}
                      required >
                      <option value="">{'Select Center'}</option>
                      {options.map(option =>
                        <option
                          key={option.id}
                          value={option.id}>{option.name}</option>)
                      }
                    </select>
                    { errors.centerId &&
                                <div className="text-danger text-center">{errors.centerId}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      name="date"
                      className="form-control text-secondary"
                      value={updateEventData.date}
                      placeholder="Event Date"
                      onChange={onChange}
                      required
                    />
                    { errors.date &&
                                <div className="text-danger text-center">{errors.date}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      name="time"
                      className="form-control text-secondary"
                      value={updateEventData.time}
                      placeholder="Event Time"
                      onChange={onChange}
                      required
                    />
                    { errors.time &&
                                <div className="text-danger text-center">{errors.time}</div>}
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-rounded mb-3"
                      rows="3"
                      name="description"
                      placeholder="Event Description"
                      value={updateEventData.description}
                      onChange={onChange}
                      required
                    />
                    { errors.description &&
                                <div className="text-danger text-center">{errors.description}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      className="form-control-file text-secondary border"
                      accept="image/*"
                      placeholder="Choose event Image"
                      value={''}
                      onChange={onChange}
                    />
                    { errors.image &&
                                <div className="text-danger text-center">{errors.image}</div>}
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

EditEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updateEventData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default EditEventForm;
