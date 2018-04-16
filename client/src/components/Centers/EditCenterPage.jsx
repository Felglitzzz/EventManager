import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';
import Validate from '../../helpers/validations/Validate';

import { updateCenter } from '../../actions/centerActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import EditCenterForm from './Form/EditCenterForm';
/**
 * class EditCenterPage
 */
class EditCenterPage extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      updateCenterData: { ...this.props.updateCenterData },
      errors: {},
      isLoading: false,
      chosenImage: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToCenters = this.redirectToCenters.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  /**
   * componentWillreceiveProps lifecycle
   * @param {object} nextProps
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.updateCenterData.id !== nextProps.updateCenterData.id) {
      this.setState({
        updateCenterData: nextProps.updateCenterData
      });
    }
    if (nextProps.imageUrl) {
      this.setState({
        updateCenterData: {
          ...this.state.updateCenterData,
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
    const temp = { ...this.state.updateCenterData };
    temp[field] = event.target.value;
    return this.setState({ updateCenterData: temp });
  }

  /**
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  selectOnChange(event) {
    event.persist();
    const { value: facility } = event.target;
    let { facilities } = this.state.updateCenterData;
    if (facilities.includes(facility)) {
      facilities = facilities.filter(element => element !== facility);
    } else {
      facilities = facilities.concat(facility);
    }
    this.setState({
      updateCenterData: {
        ...this.state.updateCenterData,
        facilities
      }
    });
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
    const { updateCenterData } = this.state;
    const { errors, isValid } = Validate.editCenter(updateCenterData);
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
      const { updateCenterData } = this.state;
      if (updateCenterData.image) {
        this.props.updateCenter(updateCenterData)
          .then(() => this.redirectToCenters())
          .catch(() => {
            this.setState({ isLoading: false });
          });
      }
      return;
    }
    this.setState({ errors: {}, isLoading: true });
    this.props.uploadToCloudinary(chosenImage)
      .then(() => {
        const { updateCenterData } = this.state;
        if (updateCenterData.image) {
          this.props.updateCenter(updateCenterData)
            .then(() => this.redirectToCenters())
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
   * @returns {void}
   */
  redirectToCenters() {
    this.setState({ isLoading: false });
    toastr.success('Center updated');
    history.push('/dashboard/centers');
  }

  /**
  * @returns { react } component
  */
  render() {
    return (
      <div>
        <EditCenterForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          updateCenterData={this.state.updateCenterData}
          errors={this.state.errors}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          handleFocus={this.handleFocus}
          selectOnChange={this.selectOnChange}
        />
      </div>
    );
  }
}
EditCenterPage.propTypes = {
  updateCenter: PropTypes.func.isRequired,
  updateCenterData: PropTypes.object.isRequired,
  imageUrl: PropTypes.object,
  uploadToCloudinary: PropTypes.func.isRequired,
};

const getCenterById = (centers, id) => {
  const centerForUpdate = centers.filter(center => center.id === id);
  if (centerForUpdate.length) return centerForUpdate[0];
  return null;
};
/**
 *
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} state
 */
function mapStateToProps(state, ownProps) {
  const centerId = parseInt(ownProps.match.params.centerId, 10);

  let updateCenterData = {
    id: '', name: '', centerId: '', date: '', time: '', description: '', image: ''
  };

  const centers = JSON.parse(localStorage.getItem('centers'));

  if (centerId && centers.length > 0) {
    updateCenterData = getCenterById(centers, centerId);
  }
  return {
    updateCenterData,
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
    updateCenter: updateCenterData => dispatch(updateCenter(updateCenterData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterPage);
