import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
import EventCenterList from './EventCenterList';
import { loadOneCenter } from '../../actions/centerActions';
import { loadEventsByCenterId } from '../../actions/eventActions';
import Pagination from '../Pagination/Pagination';
import history from '../../helpers/history';
import Prompter from '../../helpers/Prompter';

/**
 * @description - Container class component for view center page
 *
 * @class ViewCenterPage
 *
 * @extends {React.Component}
 */
class ViewCenterPage extends React.Component {
  /**
   * @description - creates an instance of ViewCenterPage
   *
   * @constructor
   *
   * @param { props } props - contains view center component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      centerReturned: {},
      eventsRetrieved: [],
      pagination: {
        next: '',
        previous: '',
        currentPage: '',
        currentPageUrl: '',
        totalPages: ''
      }
    };

    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
  }

  /**
   * @description - Fetches one center after component mounts
   *
   * @memberof EditEventCenters
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadOneCenter(this.props.centerId);
    this.props.loadEventsByCenterId(this.props.centerId, 1)
      .catch((error) => {
        Prompter.error(error);
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
    if (nextProps.centerReturned.centerReturned) {
      this.setState({
        centerReturned: nextProps.centerReturned.centerReturned.center
      });
    }

    if (nextProps.eventsRetrieved.eventsRetrieved) {
      this.setState({
        eventsRetrieved: nextProps.eventsRetrieved.eventsRetrieved.event,
        pagination: nextProps.eventsRetrieved.eventsRetrieved.meta.pagination
      });
    }

    if (nextProps.location !== this.props.location) {
      const page = nextProps.location.search.split('page=');
      this.props.loadEventsByCenterId(this.props.centerId, +page[1]);
    }
  }

  /**
   * @description - Handles fetching of events on next page request
   *
   * @memberof AllUserEvents
   *
   * @returns {void} Nothing
   */
  showNext() {
    const { url } = this.props.match;
    const { currentPage } = this.state.pagination;
    history.push(`${url}?page=${currentPage + 1}`);
  }

  /**
   * @description - Handles fetching of events on previous page request
   *
   * @memberof AllUserEvents
   *
   * @returns {void} Nothing
   */
  showPrevious() {
    const { url } = this.props.match;
    const { currentPage } = this.state.pagination;
    history.push(`${url}?page=${currentPage - 1}`);
  }

  /**
   * @description - renders edit event form
   *
   * @returns {jsx} edit event component
   */
  render() {
    const { centerReturned } = this.state;
    return (
      typeof centerReturned === 'undefined' ?
        <div className="d-flex justify-content-center pad">
          <Loader
            color1="#f6682f"
            color2="#f6682f"
            color3="#f6682f"
            color4="#f6682f"
            size={96} />
        </div>
        :
        <div>
          <div>
            <header className="form-head my-3 bg-light">
              <p className=" text-center text-muted text-orange">{centerReturned.name}</p>
            </header>
            <section
              className="the-flex">
              <img
                className="breadth-100"
                height="330"
                src={centerReturned.image}
                width="500"
              />
              <div className="bg-light">
                <ul className="list-group text-center">
                  <li className="list-group-item px-5"><strong>Facilities</strong></li>
                  {centerReturned.facilities && centerReturned.facilities.map((facility, id) =>
                    (<li className="list-group-item px-5"
                      key={id}>{facility}</li>))}
                </ul>
              </div>
            </section>
            <section className="mt-3 bg-light">
              <p className="text-center p-3 text-justify">{centerReturned.description}</p>
            </section>
          </div>
          <header className="mt-3 bg-light">
            <p className=" form-head text-center text-orange">Center-Event Log</p>
          </header>
          <div>
            <EventCenterList
              centerEvent = {this.state.eventsRetrieved}
            />
          </div>
          <div className = "pose-relative">
            <Pagination
              currentPage = {+this.state.pagination.currentPage}
              currentPageUrl = {this.state.pagination.currentPageUrl}
              next = {this.state.pagination.next}
              previous = {this.state.pagination.previous}
              showNext={this.showNext}
              showPrevious={this.showPrevious}
              totalPages = {+this.state.pagination.totalPages}
            />
          </div>
        </div>
    );
  }
}

ViewCenterPage.propTypes = {
  centerReturned: PropTypes.object.isRequired,
  loadOneCenter: PropTypes.func.isRequired,
  centerId: PropTypes.number.isRequired,
  loadEventsByCenterId: PropTypes.func.isRequired,
  eventsRetrieved: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const centerId = parseInt(ownProps.match.params.centerId, 10);
  return {
    centerReturned: state.centers,
    eventsRetrieved: state.events,
    centerId
  };
};

const mapDispatchToProps = dispatch => ({
  loadOneCenter: centerId => dispatch(loadOneCenter(centerId)),
  loadEventsByCenterId: (centerId, page) => dispatch(loadEventsByCenterId(centerId, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenterPage);
