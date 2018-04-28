import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Loader from 'react-md-spinner';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import UserEvent from '../Events/UserEvent';
import { loadAllEvent, deleteEvent } from '../../actions/eventActions';
import history from '../../helpers/history';
/**
 * class AllUserEvents
 * @return {array} component
 */
class AllUserEvents extends React.Component {
  /**
 * constructor function
 *
 * @param {object} props
 */
  constructor(props) {
    super(props);

    this.state = {
      event: [],
      isLoading: false,
      toggleDelete: false
    };

    this.redirectToEdit = this.redirectToEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.deletedMessage = this.deletedMessage.bind(this);
  }
  /**
   * component lifecycle componentDidMount
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadAllEvent();
  }

  /**
   * componentWillreceiveProps lifecycle
   *
   * @param {object} nextProps
   *
   * @returns {object} event
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.events.loadedEvents) {
      this.setState({
        event: nextProps.events.loadedEvents.event
      });
    }
  }
  /**
   * redirctToEdit function
   * @returns {void}
   */
  redirectToEdit() {
    history.push('/dashboard/events/:eventId');
  }

  /**
   * This method handles delete for events
   * @param {object} event
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
  // /**
  //  *@returns {void}
  //  */
  // deletedMessage() {
  //   swal('Poof! Your imaginary file has been deleted!', {
  //     icon: 'success',
  //   });
  //   history.push('/dashboard');
  // }

  /**
   * @returns { react } dashboard component
   */
  render() {
    const { event } = this.state;
    return (
      event.length === 0
        ?
        <div className="pt-5">
          <div className="d-flex justify-content-center">
            <img src="http://res.cloudinary.com/felglitz/image/upload/v1522307912/calendar-with-spring-binder-and-date-blocks_eocce3.png" className="img-fluid" />
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
              to="/dashboard/create-event">
              <button
                className="btn btn-orange"
              >
              Create Event
              </button></Link>
          </div>
        </div>
        :
        <section>
          <div className="container">
            <div className="row">
              < UserEvent
                events = {this.state.event}
                redirectToEdit = {this.redirectToEdit}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </section>
    );
  }
}

AllUserEvents.propTypes = {
  events: PropTypes.object.isRequired,
  loadAllEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};


/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loadedEvents
 */
const mapStateToProps = state => ({
  events: state.events
});

const mapDispatchToProps = dispatch => ({
  loadAllEvent: () => dispatch(loadAllEvent()),
  deleteEvent: eventId => dispatch(deleteEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUserEvents);
