import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { updateEvent } from '../../actions/eventActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import { loadUnpaginatedCenters } from '../../actions/centerActions';
import EditEventForm from './Form/EditEventForm';
import Validate from '../../helpers/validations/Validate';

/**
 * @description - Container class component for create event page
 *
 * @class EditEventPage
 *
 * @extends {React.Component}
 */
class EditEventPage extends React.Component {
  /**
   * @description - creates an instance of EditEventPage
   *
   * @constructor
   *
   * @param { props } props - contains edit event component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      updateEventData: { ...this.props.updateEventData },
      chosenImage: '',
      errors: {},
      options: [...this.props.options],
      events: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToEvents = this.redirectToEvents.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  /**
   * @description - Fetches centers after component mounts
   *
   * @memberof EditEventCenters
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadUnpaginatedCenters();
  }

  /**
   * @description - is invoked before the components receives new props
   *
   * @param {object} nextProps
   *
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    // if (this.props.updateEventData.id !== nextProps.events.id) {
    //   this.setState({
    //     updateEventData: nextProps.updateEventData
    //   });
    // }
    if (nextProps.options.unPaginatedCenters) {
      this.setState({
        options: nextProps.options.unPaginatedCenters.centers
      });
    }
    if (nextProps.imageUrl) {
      this.setState({
        updateEventData: {
          ...this.state.updateEventData,
          image: nextProps.imageUrl.secure_url
        }
      });
    }
  }

  /**
   * @description - handles image change event
   *
   * @param {object} event
   *
   * @returns {void}
   */
  imageOnChange(event) {
    const chosenImage = event.target.files[0];
    const imageReader = new FileReader();
    if (chosenImage) {
      imageReader.onload = () => {
        const upload = new Image(500, 330);
        upload.src = imageReader.result;
        upload.onload = () => {
          this.setState({
            uploadHeight: upload.height,
            uploadWidth: upload.width,
            chosenImage
          });
        };
      };
    }
    imageReader.readAsDataURL(chosenImage);
  }


  /**
   * @description - handles change event for edit event form
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const temp = { ...this.state.updateEventData };
    temp[field] = event.target.value;
    return this.setState({ updateEventData: temp });
  }

  /**
   * @description handles on focus event
   *
   * @method handleOnFocus
   *
   * @param { object } event - event object containing create event form details
   *
   * @returns { void }
   */
  handleFocus(event) {
    const field = event.target.name;
    const { errors } = this.state;
    errors[field] = '';
    this.setState({
      errors
    });
  }

  /**
   * @description handles validation for edit event input
   *
   * @method validate
   *
   * @param { object } event - event object containing edit event input
   *
   * @returns { object } error object and input validation status
   */
  validate() {
    const { updateEventData } = this.state;
    const { errors, isValid } = Validate.editEvent(updateEventData);
    if (!isValid) {
      this.setState({ errors, isLoading: false });
      return errors;
    }
    this.setState({ errors: {}, isLoading: true });
  }

  /**
   * @description - handles edit-event form submission
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onSubmit(event) {
    event.persist();
    event.preventDefault();
    const errors = this.validate();
    if (errors) return;
    const { chosenImage } = this.state;
    if (chosenImage === '') {
      this.setState({ isLoading: true });
      const { updateEventData } = this.state;
      if (updateEventData.image) {
        this.props.updateEvent(updateEventData)
          .then(() => this.redirectToEvents())
          .catch(() => {
            this.setState({ isLoading: false });
          });
      }
      return;
    }
    this.setState({ errors: {}, isLoading: true });
    this.props.uploadToCloudinary(chosenImage)
      .then(() => {
        const { updateEventData } = this.state;
        if (updateEventData.image) {
          this.props.updateEvent(updateEventData)
            .then(() => this.redirectToEvents())
            .catch((error) => {
              this.setState({ isLoading: false });
              toastr.error(error);
            });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  /**
   * @description - handles redirect to all events page
   *
   * @returns {void}
   */
  redirectToEvents() {
    this.setState({ isLoading: false });
    toastr.success('Event Updated');
    history.replace('/dashboard/events');
  }

  /**
   * @description - renders edit event form
   *
   * @returns {jsx} edit event component
   */
  render() {
    return (
      <div>
        <EditEventForm
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          options={this.state.options}
          updateEventData={this.state.updateEventData}
        />
      </div>
    );
  }
}
EditEventPage.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  updateEventData: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
  loadUnpaginatedCenters: PropTypes.func.isRequired
};

const getEventById = (events, id) => {
  const eventForUpdate = events.filter(event => event.id === id);
  if (eventForUpdate.length) return eventForUpdate[0];
  return null;
};

/**
 * @description maps redux state to props
 *
 * @param { object } state, - holds redux state
 * @param { object } ownProps - props
 *
 * @return { object } props - returns mapped props from state
 */
function mapStateToProps(state, ownProps) {
  const eventId = parseInt(ownProps.match.params.eventId, 10);

  let updateEventData = {
    id: '', name: '', centerId: '', date: '', time: '', description: '', image: ''
  };
  const events = JSON.parse(localStorage.getItem('events'));

  if (eventId && events.length > 0) {
    updateEventData = getEventById(events, eventId);
  }
  return {
    updateEventData,
    events: state.eventReducer,
    options: state.centerReducer,
    imageUrl: state.images.image
  };
}

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUnpaginatedCenters: () => dispatch(loadUnpaginatedCenters()),
    updateEvent: updateEventData => dispatch(updateEvent(updateEventData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
