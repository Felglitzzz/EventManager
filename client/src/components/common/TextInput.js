import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextInput = ({
  type, label, id, name, value, onChange, errors
}) => (
  <div className={classnames('form-group', { 'has-error': errors })}>
    <div className="label"><label htmlFor={id}>{label}</label></div>
    <input
      type={type}
      id={id}
      name={name}
      className="form-control"
      value={value}
      onChange={onChange}
    />
    {errors && <div style={{ color: 'red', fontSize: '0.7rem' }}>{errors}</div>}
    {errors && <div className= "alert alert-danger">{errors}</div>}}

  </div>
);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.string.isRequired
};

export default TextInput;
