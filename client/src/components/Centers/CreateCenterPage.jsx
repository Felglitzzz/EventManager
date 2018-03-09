import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import history from '../../helpers/history';

import { createCenter } from '../../actions/centerActions';
import CenterForm from './Form/CenterForm';
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
        facility: '',
        type: '',
        image: '',
      },
      errors: {},
      options: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToCenters = this.redirectToCenters.bind(this);
  }

  /**
   * onchange event function
   * @param {*} event
   * @returns {object} new state
   */
  onChange(event) {
    const field = event.target.name;
    const { centerData } = this.state;
    centerData[field] = event.target.value;
    return this.setState({ centerData });
  }

  /**
   * onSubmit event function
   * @param {*} event
   * @returns {void}
   */
  onSubmit(event) {
    event.persist();
    event.preventDefault();
    const { centerData } = this.state;

    this.props.createCenter(centerData)
      .then(() => this.redirect())
      .catch((error) => {
        toastr.error(error);
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
        />
      </div>
    );
  }
}
CreateCenterPage.propTypes = {
  createCenter: PropTypes.func.isRequired,
};

/**
 *
 * @param {func} dispatch
 * @returns {object} action
 */
function mapDispatchToProps(dispatch) {
  return {
    createCenter: centerData => dispatch(createCenter(centerData)),
  };
}

export default connect(null, mapDispatchToProps)(CreateCenterPage);
