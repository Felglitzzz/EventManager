import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
import swal from 'sweetalert';
import _ from 'lodash';

import EventCenterList from './EventCenterList';
import { loadOneCenter } from '../../actions/centerActions';
import { loadEventsByCenterId, cancelEvent, approveEvent } from '../../actions/eventActions';
import Pagination from '../Pagination/Pagination';
import Prompter from '../../helpers/Prompter';

/**
 * @description - Container class component for view center page
 *
 * @class ViewCenterPage
 *
 * @extends {React.Component}
 */
export class ViewCenterPage extends React.Component {
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
      center: {},
      events: {},
      pagination: {
        next: '',
        previous: '',
        currentPage: '',
        currentPageUrl: '',
        totalPages: ''
      },
      centerLoading: false,
      eventLoading: false,
      cancelEventLoading: false,
      approveEventLoading: false,
      error: {},
    };

    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.handleCancelEvent = this.handleCancelEvent.bind(this);
    this.handleApproveEvent = this.handleApproveEvent.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.showNoEvents = this.showNoEvents.bind(this);
  }

  /**
   * @description - sets eventLoading and centerLoading in state to true
   *
   * @memberof EditEventCenters
   *
   * @returns {void} Nothing
   */
  componentWillMount() {
    this.setState({
      eventLoading: true,
      centerLoading: true
    });
  }

  /**
   * @description - Fetches one center after component mounts
   *
   * @memberof EditEventCenters
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadOneCenter(this.props.centerId)
      .then(() => {
        this.setState({
          centerLoading: false,
        });
        this.props.loadEventsByCenterId(this.props.centerId, 1)
          .then(() => {
            this.setState({
              eventLoading: false
            });
          })
          .catch((error) => {
            this.setState({
              eventLoading: false,
              error
            });
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
    if (nextProps.center.center) {
      this.setState({
        center: nextProps.center.center.center
      });
    }

    if (nextProps.events.eventsRetrieved) {
      const { events } = nextProps.events.eventsRetrieved;
      this.setState({
        events,
        pagination: nextProps.events.eventsRetrieved.meta.pagination
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
    this.props.history.push(`${url}?page=${currentPage + 1}`);
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
    this.props.history.push(`${url}?page=${currentPage - 1}`);
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
  showNoEvents() {
    const { name } = this.state.center;
    return (
      <div
        className="py-3"
        id="shownoevents">
        <p className="text-center text-dark lead">
          {_.capitalize(name)} has no events
        </p>
      </div>
    );
  }

  /**
   * @description - Handles cancelling of event
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleCancelEvent(event) {
    event.persist();
    event.preventDefault();
    const { id: eventId, name } = event.target;
    this.setState({
      cancelEventLoading: true,
      eventId
    });
    swal({
      title: `You are about to cancel ${name.toLowerCase()}?`,
      text: 'Do you wish to continue?!',
      icon: 'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      dangerMode: true,
      buttons: {
        cancel: true,
        confirm: {
          text: 'Confirm',
          closeModal: false,
        }
      },
    })
      .then((willCancel) => {
        if (willCancel) {
          this.props.cancelEvent(eventId)
            .then(() => {
              this.setState({
                cancelEventLoading: false
              });
              swal(`${_.capitalize(name)} has been cancelled for this center`, {
                icon: 'success'
              })
                .catch(() => {
                  swal('some error occured');
                });
            });
        } else {
          this.setState({
            cancelEventLoading: false
          });
          swal(`${_.capitalize(name)} is not cancelled`);
        }
      });
  }

  /**
   * @description - Handles approve event request
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleApproveEvent(event) {
    event.persist();
    event.preventDefault();
    const { id: eventId, name } = event.target;

    swal({
      title: `You are about to approve ${name.toLowerCase()}?`,
      text: 'Do you wish to continue?!',
      icon: 'info',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: {
        cancel: true,
        confirm: {
          text: 'Confirm',
          closeModal: false,
        }
      },
    })
      .then((willapprove) => {
        this.setState({
          approveEventLoading: true
        });
        if (willapprove) {
          this.props.approveEvent(eventId)
            .then(() => {
              this.setState({
                approveEventLoading: false
              });
              swal(`${_.capitalize(name)} has been approved for this center`, {
                icon: 'success'
              });
              swal.stopLoading();
            })
            .catch(() => {
              swal('some error occured');
            });
        } else {
          this.setState({
            approveEventLoading: false
          });
          swal(`${_.capitalize(name)} is not approved`);
        }
      });
  }

  /**
   * @description - renders edit event form
   *
   * @returns {jsx} edit event component
   */
  render() {
    const { center, centerLoading, centerError } = this.state;
    const { centerId } = this.props;

    if (centerLoading) {
      return this.showLoader();
    }

    if (centerError === 'Center Not Found!' || !Number.isInteger(centerId)) {
      Prompter.error('Center Not Found!');
      this.props.history.push('/dashboard');
      return null;
    }
    return (
      <div>
        <div>
          <header className="form-head bg-light my-3 z-depth-1">
            <p className=" text-center text-orange mt-3">{center.name}</p>
          </header>
          <section
            className="the-flex">
            <img
              className="breadth-100"
              height="330"
              src={center.image}
              width="500"
            />
            <div className="bg-light"
              id="facilities">
              <ul className="list-group text-center">
                <li className="list-group-item px-5">
                  <span className="text-uppercase font-weight-bold">Facilities</span></li>
                {center.facilities && center.facilities.map((facility, id) =>
                  (<li className="list-group-item px-5"
                    key={id}>{facility}</li>))}
              </ul>
            </div>
          </section>
          <section className="mt-3 bg-light">
            <p className="text-center p-3 text-justify">{center.description}</p>
          </section>
        </div>
        <header
          className="mt-3 bg-light z-depth-1"
          id="centereventlog">
          <p className="form-head text-center text-orange">Center-Event Log</p>
        </header>

        <div>
          <EventCenterList
            approveEventLoading = {this.state.approveEventLoading}
            cancelEventLoading = {this.state.cancelEventLoading}
            error = {this.state.error}
            eventId = {+this.state.eventId}
            eventLoading = {this.state.eventLoading}
            events = {this.state.events}
            handleApproveEvent = {this.handleApproveEvent}
            handleCancelEvent = {this.handleCancelEvent}
            showLoader = {this.showLoader}
            showNoEvents = {this.showNoEvents}
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
  center: PropTypes.object.isRequired,
  loadOneCenter: PropTypes.func.isRequired,
  centerId: PropTypes.number.isRequired,
  loadEventsByCenterId: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  cancelEvent: PropTypes.func.isRequired,
  approveEvent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const centerId = Number(ownProps.match.params.centerId);
  return {
    center: state.centerReducer,
    events: state.eventReducer,
    centerId
  };
};

export const mapDispatchToProps = dispatch => ({
  loadOneCenter: centerId => dispatch(loadOneCenter(centerId)),
  loadEventsByCenterId: (centerId, page) => dispatch(loadEventsByCenterId(centerId, page)),
  cancelEvent: eventId => dispatch(cancelEvent(eventId)),
  approveEvent: eventId => dispatch(approveEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenterPage);
