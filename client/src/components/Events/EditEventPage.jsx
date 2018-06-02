import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import history from '../../helpers/history';
import { updateEvent, loadOneEvent } from '../../actions/eventActions';
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
      updateEventData: {
        name: '',
        centerId: '',
        startDate: '',
        endDate: '',
        image: ''
      },
      chosenImage: '',
      errors: {},
      options: [...this.props.options],
      isLoading: false,
      eventLoading: false,
      eventError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToEvents = this.redirectToEvents.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }

  /**
   * @description - Fetches one center after component mounts
   *
   * @memberof EditEventPage
   *
   * @returns {void} Nothing
   */
  componentWillMount() {
    this.setState({
      eventLoading: true
    });
  }

  /**
   * @description - Fetches centers after component mounts
   *
   * @memberof EditEventCenters
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadUnpaginatedCenters()
      .then(() => {
        this.props.loadOneEvent(this.props.eventId)
          .then(() => {
            this.setState({
              eventLoading: false
            });
          })
          .catch((error) => {
            this.setState({
              eventLoading: false,
              eventError: error
            });
          });
      });
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

    if (nextProps.event.event) {
      this.setState({
        updateEventData: nextProps.event.event.event
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
   * @description - shows loader
   *
   * @returns { void } nothing
   */
  showLoader() {
    return (
      <div className="d-flex justify-content-center pad">
        <Loader color1="#f6682f"
          color2="#f6682f"
          color3="#f6682f"
          color4="#f6682f"
          size={96} />
      </div>
    );
  }

  /**
   * @description - renders edit event form
   *
   * @returns {jsx} edit event component
   */
  render() {
    const { eventLoading, eventError } = this.state;
    const { eventId } = this.props;

    if (eventLoading) {
      return this.showLoader();
    }

    if (eventError === 'Event Not Found!' || !Number.isInteger(eventId)) {
      history.push('/dashboard/*');
      return null;
    }
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
  options: PropTypes.object.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
  loadUnpaginatedCenters: PropTypes.func.isRequired,
  loadOneEvent: PropTypes.func.isRequired,
  eventId: PropTypes.number.isRequired,
  event: PropTypes.object.isRequired
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
  const eventId = Number(ownProps.match.params.eventId);

  return {
    eventId,
    event: state.eventReducer,
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
    loadOneEvent: eventId => dispatch(loadOneEvent(eventId)),
    loadUnpaginatedCenters: () => dispatch(loadUnpaginatedCenters()),
    updateEvent: updateEventData => dispatch(updateEvent(updateEventData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
