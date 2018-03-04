import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Centers from './Centers';
// import history from '../../helpers/history';
import { loadCenters } from '../../actions/centerActions';

/**
 *class AllCentersPage
 */
class AllCentersPage extends React.Component {
  /**
   * constructor function
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      centers: []
    };
  }
  /**
   * component lifecycle componentDidMount
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadCenters();
  }

  /**
   * componentWillreceiveProps lifecycle
   *
   * @param {object} nextProps
   *
   * @returns {object} center
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.centers.Centers) {
      this.setState({
        centers: nextProps.centers.Centers
      });
    }
  }
  // /**
  //  * redirctToEdit function
  //  * @returns {void}
  //  */
  // redirectToEdit() {
  //   history.push('/dashboard/centers/:centerId');
  // }
  /**
   * @returns { react } dashboard component
   */
  render() {
    return (
      < Centers
        centers = {this.state.centers}
        redirectToEdit = {this.redirectToEdit}
      />
    );
  }
}

AllCentersPage.propTypes = {
  centers: PropTypes.object.isRequired,
  loadCenters: PropTypes.func.isRequired
};


/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loadedcenters
 */
const mapStateToProps = state => ({
  centers: state.centers.loadedCenters,
});

const mapDispatchToProps = dispatch => ({
  loadCenters: () => dispatch(loadCenters())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCentersPage);

