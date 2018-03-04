import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { updateCenter } from '../../actions/centerActions';
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
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToCenters = this.redirectToCenters.bind(this);
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
   * onSubmit event function
   * @param {*} event
   * @returns {void}
   */
  onSubmit(event) {
    event.persist();
    event.preventDefault();
    const { updateCenterData } = this.state;
    this.props.updateCenter(updateCenterData)
      .then(() => this.redirectToCenters())
      .catch((error) => {
        toastr.error(error);
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
        />
      </div>
    );
  }
}
EditCenterPage.propTypes = {
  updateCenter: PropTypes.func.isRequired,
  updateCenterData: PropTypes.object.isRequired,
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

  const centers = state.centers.loadedCenters.Centers;
  if (centerId && centers.length > 0) {
    updateCenterData = getCenterById(centers, centerId);
  }
  return {
    updateCenterData
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCenterPage);
