import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Loader from 'react-md-spinner';

import { Link } from 'react-router-dom';
import UserEvent from '../Events/UserEvent';
import { loadAllEvent, deleteEvent } from '../../actions/eventActions';
import history from '../../helpers/history';
import Pagination from '../Pagination/Pagination';
import Prompter from '../../helpers/Prompter';


/**
 * @description - Container class component for all events for a user
 *
 * @class AllUserEvents
 *
 * @extends {React.Component}
 */
class AllUserEvents extends React.Component {
  /**
   * @description - creates an instance of AllUserEvents
   *
   * @constructor
   *
   * @param { props } props - contains event component properties
   */
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      eventsLoading: true,
      toggleDelete: false,
      pagination: {
        next: '',
        previous: '',
        currentPage: '',
        currentPageUrl: '',
        totalPages: ''
      }
    };

    this.redirectToEdit = this.redirectToEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }

  /**
   * @description - Fetches events based on page request after component mounts
   *
   * @memberof AllUserEvents
   *
   * @returns {void} Nothing
   */
  componentDidMount() {
    this.props.loadAllEvent()
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
    if (nextProps.location !== this.props.location) {
      const page = nextProps.location.search.split('page=');
      this.props.loadAllEvent(+page[1]);
    }

    if (nextProps.events.loadedEvents) {
      const { event } = nextProps.events.loadedEvents;
      const paginationMeta = nextProps.events.loadedEvents.meta;
      const pagination = paginationMeta ? paginationMeta.pagination : undefined;
      this.setState({
        event,
        pagination,
        eventsLoading: false
      });
    } else {
      this.setState({
        eventsLoading: false
      });
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
    const { path } = this.props.match;
    const { currentPage } = this.state.pagination;
    history.push(`${path}?page=${currentPage + 1}`);
  }

  /**
   * @description - Handles fetching of events on previous page request
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
   * @description - handles redirect to edit event page
   *
   * @returns {void}
   */
  redirectToEdit() {
    history.push('/dashboard/events/:eventId');
  }

  /**
   * @description -handles delete event for events
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleDelete(event) {
    const id = parseInt(event.target.id, 10);
    swal({
      title: 'You are about to delete this event?',
      text: 'Do you wish to continue?!',
      icon: 'warning',
      closeOnClickOutside: false,
      closeOnEsc: false,
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteEvent(id);
          swal('Poof! Your event has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your event is safe!');
        }
      });
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
    return (
      <div className="pt-5">
        <div className="d-flex justify-content-center">
          <img className="img-fluid"
            src="http://res.cloudinary.com/felglitz/image/upload/v1522307912/calendar-with-spring-binder-and-date-blocks_eocce3.png"
          />
        </div>
        <div>
          <h3 className="text-center text-dark montezfont display-4">
        You have no upcoming events!
          </h3>
          <p className="text-center text-dark montezfont display-4">
        Let's change that
          </p>
          <Link
            className="d-flex justify-content-center"
            to="/dashboard/event"
          >
            <button
              className="btn btn-orange"
            >
        Create Event
            </button></Link>
        </div>
      </div>

    );
  }

  /**
   * @description - renders user's events based on page request
   *
   * @returns {jsx} userEvent component
   */
  render() {
    const { event, eventsLoading } = this.state;

    if (eventsLoading) {
      return this.showLoader();
    }

    if (event.count === undefined) {
      return this.showNoEvents();
    }

    return (<section>
      <div className="container">
        <div className="row">
          <UserEvent
            events = {this.state.event}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
      {event && event.length !== 0
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
    </section>);
  }
}

AllUserEvents.propTypes = {
  events: PropTypes.object.isRequired,
  loadAllEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};


/**
 * @description maps redux state to props
 *
 * @param { object } state - holds redux state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
  events: state.events,
});

/**
 * @description maps action dispatched to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch =>
  ({
    loadAllEvent: page => dispatch(loadAllEvent(page)),
    deleteEvent: eventId => dispatch(deleteEvent(eventId))
  });

export default connect(mapStateToProps, mapDispatchToProps)(AllUserEvents);
