import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import history from '../../helpers/history';
import Prompter from '../../helpers/Prompter';
import { createCenter } from '../../actions/centerActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import CenterForm from './Form/CenterForm';
import Validate from '../../helpers/validations/Validate';

/**
 * @description - Container class component for create center page
 *
 * @class CreateCenterPage
 *
 * @extends {React.Component}
 */
class CreateCenterPage extends React.Component {
  /**
   * @description - creates an instance of CreateCenterPage
   *
   * @param { props } props - contains create center component properties
   *
   * @memberof CreateCenterPage
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
   * @description - is invoked before the components receives new props
   *
   * @param {object} nextProps
   *
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
   * @description - handles create center form input change event
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const { centerData } = this.state;
    centerData[field] = event.target.value;
    return this.setState({ centerData });
  }

  /**
   * @description - handles changes in the select input type for create center form
   *
   * @param {object} event
   *
   * @returns {void}
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
   * @description handles validation for create center input
   *
   * @method validate
   *
   * @param { object } event - event object
   *
   * @returns { object } error object and input validation status
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
   * @description - handles create-center form submission
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
        const { centerData } = this.state;
        if (centerData.image) {
          this.props.createCenter(centerData)
            .then(() => this.redirectToCenters())
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
   * @description - handles redirect to all centers page
   *
   * @returns {void}
   */
  redirectToCenters() {
    this.setState({ isLoading: false });
    Prompter.success('Center Created');
    history.replace('/dashboard/centers');
  }

  /**
   * @description - renders create event form
   *
   * @returns {jsx} CenterForm component
   */
  render() {
    return (
      <div>
        <CenterForm
          centerData={this.state.centerData}
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
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
 * @description maps redux state to props
 *
 * @param { object } state - holds redux state
 *
 * @return { object } props - returns mapped props from state
 */
function mapStateToProps(state) {
  return {
    imageUrl: state.imageReducer.image
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
    createCenter: centerData => dispatch(createCenter(centerData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCenterPage);
