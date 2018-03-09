import React from 'react';
import PropTypes from 'prop-types';

const EventForm = ({
  onChange, onSubmit, eventData, options, imageOnChange
}) => (
  <div>
    <div className="py-5">
      <div className="form-width mx-auto bg-white">
        <header className="shadow-down">
          <p className=" form-head text-center text-orange">Create Event</p>
        </header>
        <section>
          <div className="img-fluid d-flex justify-content-center mt-5">
            <div className="container">
              <form onSubmit={onSubmit} >
                <div>
                  <p className="p-3 bg-orange text-light text-center lead">
                    Fill the form to create event
                  </p>
                </div>
                <div className="p-5">
                  <div className="form-group">
                    <input
                      type="name"
                      name="name"
                      className= "form-control"
                      placeholder="Event Name"
                      value={eventData.name}
                      onChange={onChange}
                      required
                    />

                  </div>
                  <div className="form-group">
                    <select
                      type="name"
                      name="centerId"
                      className="form-control"
                      value={eventData.centerId}
                      placeholder="Select Center"
                      onChange={onChange}
                      required >
                      <option value="" required>{'Select Center'}</option>
                      {options.map(option =>
                        <option
                          key={option.id}
                          value={option.id}>{option.name}</option>)
                      }
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="date"
                      name="date"
                      className="form-control text-secondary"
                      value={eventData.date}
                      placeholder="Event Date"
                      onChange={onChange}
                      required
                    />

                  </div>
                  <div className="form-group">
                    <input
                      type="time"
                      name="time"
                      className="form-control text-secondary"
                      value={eventData.time}
                      placeholder="Event Time"
                      onChange={onChange}
                      required
                    />

                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-rounded mb-3"
                      rows="3"
                      name="description"
                      placeholder="Event Description"
                      value={eventData.description}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="file"
                      name="image"
                      id="file-upload"
                      className="form-control-file text-secondary border"
                      accept="image/*"
                      placeholder="Choose Event Image"
                      onChange={imageOnChange}
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

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  eventData: PropTypes.object.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired,
  imageOnChange: PropTypes.func.isRequired
};

export default EventForm;
