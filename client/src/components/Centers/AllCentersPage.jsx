import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
import { Link } from 'react-router-dom';

import history from '../../helpers/history';
import UnitCenter from './UnitCenter';
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
      centers: {},
      centersLoading: true,
      pagination: {
        next: '',
        previous: '',
        currentPage: '',
        currentPageUrl: '',
        totalPages: '',
      }
    };

    // this.handleDelete = this.handleDelete.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }

  /**
   * @description - Fetches centers based on page request after component mounts
   *
   * @memberof AllCentersPage
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadCenters()
      .catch((error) => {
        console.log(error);
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
    if (nextProps.location !== this.props.location) {
      const page = nextProps.location.search.split('page=');
      this.props.loadCenters(+page[1]);
    }

    if (nextProps.centers.centers) {
      const { centers } = nextProps.centers.centers;
      const paginationMeta = nextProps.centers.centers.meta;
      const pagination = paginationMeta ? paginationMeta.pagination : undefined;
      this.setState({
        centers,
        pagination,
        centersLoading: false
      });
    } else {
      this.setState({
        centersLoading: false
      });
    }
  }

  // /**
  //  * @description -handles delete center
  //  *
  //  * @param {object} center
  //  *
  //  * @returns {void}
  //  */
  // handleDelete(center) {
  //   const id = parseInt(center.target.id, 10);
  //   swal({
  //     title: 'You are about to delete this center?',
  //     text: 'Do you wish to continue?!',
  //     icon: 'warning',
  //     closeOnClickOutside: false,
  //     closeOnEsc: false,
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         this.props.deleteCenter(id);
  //         swal('Poof! Your event has been deleted!', {
  //           icon: 'success',
  //         });
  //       } else {
  //         swal('Your center is safe!');
  //       }
  //     });
  // }

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
   * @description - shows loader
   *
   * @returns { void }
   */
  showNoCenters() {
    return (
      <div className="pt-5">
        <div className="d-flex justify-content-center">
          <img className="img-fluid"
            src="http://res.cloudinary.com/felglitz/image/upload/v1522307912/calendar-with-spring-binder-and-date-blocks_eocce3.png"
          />
        </div>
        <div>
          <h3 className="text-center text-dark pt-4">
        You have no centers!
          </h3>
          <p className="text-center text-dark pb-2">
        Let's change that
          </p>
          <Link
            className="d-flex justify-content-center"
            to="/dashboard/center"
          >
            <button
              className="btn btn-orange"
            >
        Create Center
            </button></Link>
        </div>
      </div>

    );
  }

  /**
   * @description - renders all centers based on page request
   *
   * @returns {jsx} Centers component
   */
  render() {
    const { centers, centersLoading } = this.state;

    if (centersLoading) {
      return this.showLoader();
    }

    if (centers.count === undefined) {
      return this.showNoCenters();
    }

    return (
      <section>
        <div className="container pad-top">
          <div className="row">
            <UnitCenter
              centers = {this.state.centers}
            />
          </div>
        </div>
        {centers && centers.length !== 0
          ?
          <Pagination
            currentPage = {this.state.pagination.currentPage}
            currentPageUrl = {this.state.pagination.currentPageUrl}
            next = {this.state.pagination.next}
            previous = {this.state.pagination.previous}
            showNext={this.showNext}
            showPrevious={this.showPrevious}
            totalPages = {this.state.pagination.totalPages}
          />
          : (null) }
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
  centers: state.centerReducer,
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

