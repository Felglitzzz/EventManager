import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import validate from '../../helpers/validations/inputValidate';


import { updateEvent } from '../../actions/eventActions';
import EditEventForm from './Form/EditEventForm';
/**
 * class EditEventPage
 */
class EditEventPage extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      updateEventData: { ...this.props.updateEventData },
      errors: {},
      options: [...this.props.options]
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  /**
   * componentWillreceiveProps lifecycle
   * @param {object} nextProps
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.updateEventData.id !== nextProps.updateEventData.id) {
      this.setState({
        updateEventData: nextProps.updateEventData
      });
    }
    if (nextProps.options) {
      this.setState({
        options: nextProps.options
      });
    }
  }

  /**
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const temp = { ...this.state.updateEventData };
    temp[field] = event.target.value;
    return this.setState({ updateEventData: temp });
  }

  /**
   * @returns {object} error or isValid status
   */
  isValid() {
    const { errors, isValid } = validate(this.state.updateEventData);
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
    const { updateEventData } = this.state;
    this.props.updateEvent(updateEventData)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
      });
  }

  /**
   * @returns {void}
   */
  redirect() {
    this.setState({ isLoading: false });
    toastr.success('Event updated');
    history.push('/dashboard/events');
  }

  /**
  * @returns { react } component
  */
  render() {
    return (
      <div>
        <EditEventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          updateEventData={this.state.updateEventData}
          errors={this.state.errors}
          options={this.state.options}
        />
      </div>
    );
  }
}
EditEventPage.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  updateEventData: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};

const getEventById = (events, id) => {
  const eventForUpdate = events.filter(event => event.id === id);
  if (eventForUpdate.length) return eventForUpdate[0];
  return null;
};
/**
 *
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} state
 */
function mapStateToProps(state, ownProps) {
  const eventId = parseInt(ownProps.match.params.eventId, 10);

  let updateEventData = {
    id: '', name: '', centerId: '', date: '', time: '', description: '', image: ''
  };

  const events = state.events.loadedEvents.event;
  if (eventId && events.length > 0) {
    updateEventData = getEventById(events, eventId);
  }
  return {
    updateEventData,
    options: state.centers.loadedCenters.Centers
  };
}

/**
 *
 * @param {func} dispatch
 * @param {object} ownProps
 * @returns {object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    updateEvent: updateEventData => dispatch(updateEvent(updateEventData)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
