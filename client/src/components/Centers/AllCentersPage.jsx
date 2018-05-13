import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
import swal from 'sweetalert';

import history from '../../helpers/history';
import Centers from './Centers';
import { loadCenters, deleteCenter } from '../../actions/centerActions';
import Pagination from '../Pagination/Pagination';

/**
 * @description - Container class component for all centers
 *
 * @class AllCentersPage
 *
 * @extends {React.Component}
 */
class AllCentersPage extends React.Component {
  /**
   * @description - creates an instance of AllCentersPage
   *
   * @constructor
   *
   * @param { props } props - contains event component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      centers: [],
      pagination: {
        next: '',
        previous: '',
        currentPage: '',
        currentPageUrl: '',
        totalPages: '',
      }
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
  }

  /**
   * @description - Fetches centers based on page request after component mounts
   *
   * @memberof AllCentersPage
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadCenters();
  }

  /**
   * @description - is invoked before the components receives new props
   *
   * @param {object} nextProps
   *
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      const page = nextProps.location.search.split('page=');
      this.props.loadCenters(+page[1]);
    }

    if (nextProps.centers.loadedCenters) {
      this.setState({
        centers: nextProps.centers.loadedCenters.Centers,
        pagination: nextProps.centers.loadedCenters.meta.pagination
      });
    }
  }

  /**
   * @description -handles delete center
   *
   * @param {object} center
   *
   * @returns {void}
   */
  handleDelete(center) {
    const id = parseInt(center.target.id, 10);
    swal({
      title: 'You are about to delete this center?',
      text: 'Do you wish to continue?!',
      icon: 'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteCenter(id);
          swal('Poof! Your event has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your center is safe!');
        }
      });
  }

  /**
   * @description - Handles fetching of centers on next page request
   *
   * @memberof AllCentersPage
   *
   * @returns {void} Nothing
   */
  showNext() {
    const { path } = this.props.match;
    const { currentPage } = this.state.pagination;
    history.push(`${path}?page=${currentPage + 1}`);
  }

  /**
   * @description - Handles fetching of centers on previous page request
   *
   * @memberof AllUserEvents
   *
   * @returns {void} Nothing
   */
  showPrevious() {
    const { path } = this.props.match;
    const { currentPage } = this.state.pagination;
    history.push(`${path}?page=${currentPage - 1}`);
  }

  /**
   * @description - renders all centers based on page request
   *
   * @returns {jsx} Centers component
   */
  render() {
    const { centers } = this.state;
    return (
      centers.length === 0
        ?
        <div className="d-flex justify-content-center pad">
          <Loader
            color1="#f6682f"
            color2="#f6682f"
            color3="#f6682f"
            color4="#f6682f"
            size={96} />
        </div>
        :
        <section>
          <div className="container">
            <div className="row">
              <Centers
                centers = {this.state.centers}
                handleDelete = {this.handleDelete}
                redirectToEdit = {this.redirectToEdit}
              />
            </div>
          </div>
          <Pagination
            currentPage = {this.state.pagination.currentPage}
            currentPageUrl = {this.state.pagination.currentPageUrl}
            next = {this.state.pagination.next}
            previous = {this.state.pagination.previous}
            showNext={this.showNext}
            showPrevious={this.showPrevious}
            totalPages = {this.state.pagination.totalPages}
          />
        </section>
    );
  }
}

AllCentersPage.propTypes = {
  centers: PropTypes.object.isRequired,
  loadCenters: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  deleteCenter: PropTypes.func.isRequired,
};


/**
 * @description maps redux state to props
 *
 * @param { object } state - holds redux state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  centers: state.centers,
  pagination: state.centers.loadedCenters
});

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  loadCenters: page => dispatch(loadCenters(page)),
  deleteCenter: centerId => dispatch(deleteCenter(centerId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCentersPage);

