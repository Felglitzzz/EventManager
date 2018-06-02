import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-md-spinner';

import history from '../../helpers/history';
import Validate from '../../helpers/validations/Validate';
import { updateCenter, loadOneCenter } from '../../actions/centerActions';
import { uploadToCloudinary } from '../../actions/imageActions';
import EditCenterForm from './Form/EditCenterForm';
import Prompter from '../../helpers/Prompter';

/**
 * @description - Container class component for edit center page
 *
 * @class EditCenterPage
 *
 * @extends {React.Component}
 */
class EditCenterPage extends React.Component {
  /**
   * @description - creates an instance of EditCenterPage
   *
   * @constructor
   *
   * @param { props } props - contains edit center component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      updateCenterData: {},
      errors: {},
      isLoading: false,
      centerLoading: true,
      chosenImage: '',
      centerError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToCenters = this.redirectToCenters.bind(this);
    this.imageOnChange = this.imageOnChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }

  /**
   * @description - Fetches one center after component mounts
   *
   * @memberof EditCenterPage
   *
   * @returns {void} Nothing
   */
  componentWillMount() {
    this.setState({
      centerLoading: true
    });
  }

  /**
   * @description - Fetches one center after component mounts
   *
   * @memberof EditCenterPage
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadOneCenter(this.props.centerId)
      .then(() => {
        this.setState({
          centerLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          centerLoading: false,
          centerError: error
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
    console.log('nextProps', nextProps);
    if (nextProps.center.center) {
      this.setState({
        updateCenterData: nextProps.center.center.center
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
   * @description - handles change event for edit center form
   *
   * @param {object} event
   *
   * @returns {void}
   */
  onChange(event) {
    event.persist();
    const field = event.target.name;
    const temp = { ...this.state.updateCenterData };
    temp[field] = event.target.value;
    return this.setState({ updateCenterData: temp });
  }

  /**
   * @description - handles changes in the select input type for edit center form
   *
   * @param {object} event
   *
   * @returns {void}
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
   * @description handles validation for edit center input
   *
   * @method validate
   *
   * @param { object } event - event object containing edit center input
   *
   * @returns { object } error object and input validation status
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
   * @description - handles edit-center form submission
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
      const { updateCenterData } = this.state;
      if (updateCenterData.image) {
        this.props.updateCenter(updateCenterData)
          .then(() => this.redirectToCenters())
          .catch((error) => {
            this.setState({ isLoading: false });
            Prompter.error(error);
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
              Prompter.error(error);
            });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  /**
   * @description handles on focus event
   *
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
   * @description - handles redirect to all centers page
   *
   * @returns {void}
   */
  redirectToCenters() {
    this.setState({ isLoading: false });
    Prompter.success('Center updated');
    history.push('/dashboard/centers');
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
   * @description - renders edit center form
   *
   * @returns {jsx} edit center component
   */
  render() {
    const { centerLoading, centerError } = this.state;
    const { centerId } = this.props;

    if (centerLoading) {
      return this.showLoader();
    }

    if (centerError === 'Center Not Found!' || !Number.isInteger(centerId)) {
      history.push('/dashboard/*');
      return null;
    }

    return (
      <div>
        <EditCenterForm
          errors={this.state.errors}
          handleFocus={this.handleFocus}
          imageOnChange={this.imageOnChange}
          isLoading={this.state.isLoading}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          selectOnChange={this.selectOnChange}
          updateCenterData={this.state.updateCenterData}
        />
      </div>
    );
  }
}
EditCenterPage.propTypes = {
  updateCenter: PropTypes.func.isRequired,
  imageUrl: PropTypes.object,
  uploadToCloudinary: PropTypes.func.isRequired,
  loadOneCenter: PropTypes.func.isRequired,
  centerId: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired
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
  const centerId = Number(ownProps.match.params.centerId);
  return {
    centerId,
    center: state.centerReducer,
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
    loadOneCenter: centerId => dispatch(loadOneCenter(centerId)),
    updateCenter: updateCenterData => dispatch(updateCenter(updateCenterData)),
    uploadToCloudinary: image => dispatch(uploadToCloudinary(image))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterPage);
