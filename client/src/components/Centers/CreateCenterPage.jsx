import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { createCenter } from '../../actions/centerActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import CenterForm from './Form/CenterForm';
import Validate from '../../helpers/validations/Validate';
/**
 * class CreateCenterPage
 */
class CreateCenterPage extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      centerData: {
        name: '',
        location: '',
        capacity: '',
        price: '',
        facilities: [],
        type: '',
        image: '',
      },
      chosenImage: '',
      uploadHeight: '',
      uploadWidth: '',
      errors: {},
      options: [],
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.redirectToCenters = this.redirectToCenters.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  /**
   * componentWillreceiveProps lifecycle
   * @param {object} nextProps
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUrl) {
      this.setState({
        centerData: {
          ...this.state.centerData,
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
    const { centerData } = this.state;
    centerData[field] = event.target.value;
    return this.setState({ centerData });
  }

  /**
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  selectOnChange(event) {
    event.persist();
    if (event.target.checked) {
      return this.setState({
        centerData: {
          ...this.state.centerData,
          facilities: this.state.centerData.facilities.concat(event.target.value)
        }
      });
    }
    const { facilities } = this.state.centerData;
    const name = event.target.value;
    for (let i = facilities.length - 1; i >= 0; i -= 1) {
      if (facilities[i] === name) {
        facilities.splice(i, 1);
        this.setState({
          centerData: {
            ...this.state.centerData,
            facilities
          }
        });
      }
    }

    return this.setState({
      centerData: {
        ...this.state.centerData,
        facilities: this.state.centerData.facilities.slice()
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
   * @description handles on focus event
   * @method handleOnFocus
   *
   * @param { object } event object
   *
   * @returns { object } empty string
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
    const { chosenImage, centerData } = this.state;
    const { errors, isValid } = Validate.createCenter(centerData, chosenImage);
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
        const { centerData } = this.state;
        if (centerData.image) {
          this.props.createCenter(centerData)
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
   * @param {string} status
   * @returns {void}
   */
  redirectToCenters() {
    this.setState({ isLoading: false });
    toastr.success('Center Created');
    history.replace('/dashboard/centers');
  }

  /**
  * @returns { react } component
  */
  render() {
    return (
      <div>
        <CenterForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          centerData={this.state.centerData}
          imageOnChange={this.imageOnChange}
          errors={this.state.errors}
          isLoading={this.state.isLoading}
          handleFocus={this.handleFocus}
          selectOnChange={this.selectOnChange}
        />
      </div>
    );
  }
}
CreateCenterPage.propTypes = {
  createCenter: PropTypes.func.isRequired,
  uploadToCloudinary: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
};

/**
 * @param {object} state
 * @returns {object} state
 */
function mapStateToProps(state) {
  return {
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
    createCenter: centerData => dispatch(createCenter(centerData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCenterPage);
