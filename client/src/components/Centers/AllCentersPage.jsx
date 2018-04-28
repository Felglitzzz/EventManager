import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
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
    if (nextProps.centers.loadedCenters) {
      this.setState({
        centers: nextProps.centers.loadedCenters.Centers
      });
    }
  }

  /**
   * @returns { react } dashboard component
   */
  render() {
    const { centers } = this.state;
    return (
      centers.length === 0
        ?
        <div className="d-flex justify-content-center pad">
          <Loader
            size={96}
            color1="#f6682f"
            color2="#f6682f"
            color3="#f6682f"
            color4="#f6682f"/>
        </div>
        :
        <section>
          <div className="container">
            <div className="row">
              < Centers
                centers = {this.state.centers}
                redirectToEdit = {this.redirectToEdit}
              />
            </div>
          </div>
        </section>
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
  centers: state.centers,
});

const mapDispatchToProps = dispatch => ({
  loadCenters: () => dispatch(loadCenters())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCentersPage);

