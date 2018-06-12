import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import { addNewEvent } from '../../actions/eventActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import { loadUnpaginatedCenters } from '../../actions/centerActions';
import EventForm from './Form/EventForm';
import Validate from '../../helpers/validations/Validate';
import Prompter from '../../helpers/Prompter';

/**
 * @description - Container class component for create event page
 *
 * @class CreateEventPage
 *
 * @extends {React.Component}
 */
export class CreateEventPage extends React.Component {
  /**
   * @description - creates an instance of CreateEventPage
   *
   * @constructor
   *
   * @param { props } props - contains create event component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      eventData: {
        name: '',
        centerId: '',
        startDate: '',
        endDate: '',
        image: ''
      },
      chosenImage: '',
      chosenImageUrl: '',
      errors: {},
      options: [],
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToEvents = this.redirectToEvents.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.validate = this.validate.bind(this);
  }

  /**
   * @description - Fetches centers after component mounts
   *
   * @memberof CreateEventPage
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
    if (nextProps.options.unPaginatedCenters) {
      this.setState({
        options: nextProps.options.unPaginatedCenters.centers
      });
    }
    if (nextProps.imageUrl) {
      this.setState({
        eventData: {
          ...this.state.eventData,
          image: nextProps.imageUrl.secure_url
        }
      });
    }
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
   * @description - handles create event form input change event
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const { eventData } = this.state;
    eventData[field] = event.target.value;
    return this.setState({ eventData });
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
        this.setState({
          chosenImage,
          chosenImageUrl: imageReader.result
        });
      };
    }
    imageReader.readAsDataURL(chosenImage);
  }

  /**
   * @description handles validation for create event input
   *
   * @method validate
   *
   * @param { object } event - event object
   *
   * @returns { object } error object and input validation status
   */
  validate() {
    const { chosenImage, eventData } = this.state;
    const { errors, isValid } = Validate.addEvent(eventData, chosenImage);
    if (!isValid) {
      this.setState({ errors, isLoading: false });
      return errors;
    }
    this.setState({ errors: {}, isLoading: true });
  }

  /**
   * @description - handles create-event form submission
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
    this.props.uploadToCloudinary(chosenImage)
      .then(() => {
        const { eventData } = this.state;
        if (eventData.image) {
          this.props.addNewEvent(eventData)
            .then(() => this.redirectToEvents())
            .catch((error) => {
              this.setState({ isLoading: false });
              Prompter.error(error);
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
    Prompter.success('Event Created');
    history.replace('/dashboard/events');
  }

  /**
   * @description - renders create event form
   *
   * @returns {jsx} EventForm component
   */
  render() {
    return (
      <div>
        <EventForm
          errors={this.state.errors}
          eventData={this.state.eventData}
          handleFocus={this.handleFocus}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          options={this.state.options}
        />
      </div>
    );
  }
}

CreateEventPage.propTypes = {
  addNewEvent: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
  loadUnpaginatedCenters: PropTypes.func.isRequired
};

/**
 * @description maps redux state to props
 *
 * @param { object } state - holds redux state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  options: state.centerReducer,
  imageUrl: state.imageReducer.image
});

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
export const mapDispatchToProps = dispatch => ({
  loadUnpaginatedCenters: () => dispatch(loadUnpaginatedCenters()),
  addNewEvent: eventData => dispatch(addNewEvent(eventData)),
  uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);
