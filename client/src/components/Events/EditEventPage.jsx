import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { updateEvent } from '../../actions/eventActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import { loadCenters } from '../../actions/centerActions';
import EditEventForm from './Form/EditEventForm';
import Validate from '../../helpers/validations/Validate';
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
    if (this.props.updateEventData.id !== nextProps.updateEventData.id) {
      this.setState({
        updateEventData: nextProps.updateEventData
      });
    }
    if (nextProps.options) {
      this.setState({
        options: nextProps.options.loadedCenters.Centers
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
   * @description handler for image upload - imageOnChange
   * @param {object} event
   * @returns {object} selected file
   */
  imageOnChange(event) {
    const chosenImage = event.target.files[0];
    const imageReader = new FileReader();
    if (chosenImage) {
      imageReader.onload = () => {
        const upload = new Image();
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
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event - event object containing sign in details
   *
   * @returns { object } new sign in details state
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
   *@returns {void}
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
   * onSubmit event function
   * @param {*} event
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
   * @returns {void}
   */
  redirectToEvents() {
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
        <EditEventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          updateEventData={this.state.updateEventData}
          errors={this.state.errors}
          options={this.state.options}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          handleFocus={this.handleFocus}
        />
      </div>
    );
  }
}
EditEventPage.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  updateEventData: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  loadCenters: PropTypes.func.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
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
  const events = JSON.parse(localStorage.getItem('events'));

  if (eventId && events.length > 0) {
    updateEventData = getEventById(events, eventId);
  }
  return {
    updateEventData,
    options: state.centers,
    imageUrl: state.images.image
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
    loadCenters: () => dispatch(loadCenters()),
    updateEvent: updateEventData => dispatch(updateEvent(updateEventData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventPage);
