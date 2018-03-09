import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { addNewEvent, uploadToCloudinary } from '../../actions/eventActions';
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
      chosenImage: '',
      errors: {},
      options: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToEvents = this.redirectToEvents.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
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
    console.log(nextProps.imageUrl);
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
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  onChange(event) {
    event.persist();
    console.log(event);
    console.log(event.target.files);
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
   * onSubmit event function
   * @param {*} event
   * @returns {void}
   */
  onSubmit(event) {
    event.persist();
    event.preventDefault();
    const { eventData, chosenImage } = this.state;
    this.props.uploadToCloudinary(chosenImage)
      .then(() => {
        if (this.state.eventData.image) {
          this.props.addNewEvent(eventData)
            .then(() => this.redirectToEvents())
            .catch((error) => {
              toastr.error(error);
            });
        }
      });
  }

  /**
   * @param {string} status
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
  imageUrl: PropTypes.string

};

/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} state
 */
function mapStateToProps(state) {
  console.log(state);
  return {
    options: state.centers.loadedCenters,
    imageUrl: state.events.image
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
