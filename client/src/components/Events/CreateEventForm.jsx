import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import { addNewEvent } from '../../actions/eventActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import { loadCenters } from '../../actions/centerActions';
import EventForm from './Form/EventForm';
import Validate from '../../helpers/validations/Validate';
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
      chosenImage: '',
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
        options: nextProps.options.loadedCenters.Centers
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
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const { eventData } = this.state;
    eventData[field] = event.target.value;
    return this.setState({ eventData });
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
   *@returns {void}
   */
  validate() {
    const { chosenImage, eventData } = this.state;
    const { errors, isValid } = Validate.createEvent(eventData, chosenImage);
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
    this.props.uploadToCloudinary(chosenImage)
      .then(() => {
        const { eventData } = this.state;
        if (eventData.image) {
          this.props.addNewEvent(eventData)
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
        <EventForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          eventData={this.state.eventData}
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

CreateEventForm.propTypes = {
  addNewEvent: PropTypes.func.isRequired,
  loadCenters: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
};

/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} state
 */
function mapStateToProps(state) {
  return {
    options: state.centers,
    imageUrl: state.images.image
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
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventForm);
