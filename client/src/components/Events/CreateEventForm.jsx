import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import validate from '../../helpers/validations/inputValidate';

import { addNewEvent } from '../../actions/eventActions';
import { loadCenters } from '../../actions/centerActions';
import EventForm from './Form/EventForm';
/**
 * class CreateEventForm
 */
class CreateEventForm extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      eventData: {
        name: '',
        centerId: '',
        date: '',
        time: '',
        description: '',
        image: ''
      },
      errors: {},
      options: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  /**
   * Component lifecycle
   * @returns {func} componentWillMount
   */
  componentDidMount() {
    this.props.loadCenters();
  }
  /**
   * componentWillreceiveProps lifecycle
   * @param {object} nextProps
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.options) {
      this.setState({
        options: nextProps.options.Centers
      });
    }
  }
  /**
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  onChange(event) {
    const field = event.target.name;
    const { eventData } = this.state;
    eventData[field] = event.target.value;
    return this.setState({ eventData });
  }

  /**
   * @returns {object} error or isValid status
   */
  isValid() {
    const { errors, isValid } = validate(this.state.eventData);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   * onSubmit event function
   * @param {*} event
   * @returns {void}
   */
  onSubmit(event) {
    event.persist();
    event.preventDefault();
    const { eventData } = this.state;
    if (!this.isValid()) {
      return;
    }

    this.props.addNewEvent(eventData)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
      });
  }

  /**
   * @param {string} status
   * @returns {void}
   */
  redirect() {
    this.setState({ isLoading: false });
    toastr.success('Event Created');
    history.replace('/dashboard/events');
  }

  /**
  * @returns { react } component
  */
  render() {
    return (
      <div>
        <EventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          eventData={this.state.eventData}
          errors={this.state.errors}
          options={this.state.options}
        />
      </div>
    );
  }
}
CreateEventForm.propTypes = {
  addNewEvent: PropTypes.func.isRequired,
  loadCenters: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,

};

/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} state
 */
function mapStateToProps(state) {
  return {
    options: state.centers.loadedCenters
  };
}
/**
 *
 * @param {func} dispatch
 * @returns {object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    loadCenters: () => dispatch(loadCenters()),
    addNewEvent: eventData => dispatch(addNewEvent(eventData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);
