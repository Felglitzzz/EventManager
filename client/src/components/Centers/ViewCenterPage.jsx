import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EventCenterList from './EventCenterList';
import { loadOneCenter } from '../../actions/centerActions';

class ViewCenterPage extends React.Component { //eslint-disable-line
  constructor (props) { //eslint-disable-line
    super(props);
    console.log(this.props);

    this.state = {
      centerReturned: { ...this.props.centerReturned.center },
    };
  }
  /**
   * @returns {void}
   */
  componentDidMount() {
    this.props.loadOneCenter(this.props.centerId);
  }

  /**
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.centerReturned.center) {
      this.setState({
        centerReturned: nextProps.centerReturned.center
      });
    }
  }

  /**
   * @return {component} viewcenter
   */
  render() {
    const { centerReturned } = this.state;
    return (
      <div>
        <div>
          <header className="form-head shadow-down my-3 bg-light">
            <p className=" text-center text-muted text-orange">{centerReturned.name}</p>
          </header>
          <section className="d-flex justify-content-center">
            <img
              className="img-fluid"
              src={centerReturned.image}
            />
          </section>
          <section className="mt-3 shadow-down bg-light">
            <p className="text-center p-3 text-justify">{centerReturned.description}</p>
          </section>
        </div>
        <header className="shadow-down mt-3 bg-light">
          <p className=" form-head text-center text-orange">Center-Event Log</p>
        </header>
        < EventCenterList centerReturned = {this.state.centerReturned}/>
      </div>
    );
  }
}

ViewCenterPage.propTypes = {
  centerReturned: PropTypes.object.isRequired,
  loadOneCenter: PropTypes.func.isRequired,
  centerId: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const centerId = parseInt(ownProps.match.params.centerId, 10);
  return {
    centerReturned: state.centers.centerReturned,
    centerId
  };
};

const mapDispatchToProps = dispatch => ({
  loadOneCenter: centerId => dispatch(loadOneCenter(centerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenterPage);
