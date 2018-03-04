import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserEvent from '../Events/UserEvent';
import { loadAllEvent } from '../../actions/eventActions';
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
      event: []
    };

    this.redirectToEdit = this.redirectToEdit.bind(this);
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
    if (nextProps.events) {
      this.setState({
        event: nextProps.events.event
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
   * @returns { react } dashboard component
   */
  render() {
    return (
      < UserEvent
        events = {this.state.event}
        redirectToEdit = {this.redirectToEdit}
      />
    );
  }
}

AllUserEvents.propTypes = {
  events: PropTypes.object.isRequired,
  loadAllEvent: PropTypes.func.isRequired
};


/**
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} loadedEvents
 */
const mapStateToProps = state => ({
  events: state.events.loadedEvents,
});

const mapDispatchToProps = dispatch => ({
  loadAllEvent: () => dispatch(loadAllEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllUserEvents);
