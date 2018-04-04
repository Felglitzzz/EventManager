import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-md-spinner';
import EventCenterList from './EventCenterList';
import { loadOneCenter } from '../../actions/centerActions';

class ViewCenterPage extends React.Component { //eslint-disable-line
  constructor (props) { //eslint-disable-line
    super(props);

    this.state = {
      centerReturned: {}
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
    if (nextProps.centerReturned.centerReturned.center) {
      this.setState({
        centerReturned: nextProps.centerReturned.centerReturned.center
      });
    }
  }

  /**
   * @return {component} viewcenter
   */
  render() {
    const { centerReturned } = this.state;
    return (
      typeof centerReturned === 'undefined' ?
        <div className="d-flex justify-content-center pad">
          <Loader
            size={96}
            color1="#f6682f"
            color2="#f6682f"
            color3="#f6682f"
            color4="#f6682f"/>
        </div>
        :
        <div>
          <div>
            <header className="form-head shadow-down my-3 bg-light">
              <p className=" text-center text-muted text-orange">{centerReturned.name}</p>
            </header>
            <section
              className="d-flex justify-content-center">
              <img
                width="500"
                height="330"
                src={centerReturned.image}
              />
              <div className="bg-light">
                <ul className="list-group text-center">
                  <li className="list-group-item px-5"><strong>Facilities</strong></li>
                  {centerReturned.facilities && centerReturned.facilities.map((facility, id) =>
                    <li className="list-group-item px-5" key={id}>{facility}</li>)}
                </ul>
              </div>
            </section>
            <section className="mt-3 shadow-down bg-light">
              <p className="text-center p-3 text-justify">{centerReturned.description}</p>
            </section>
          </div>
          <header className="shadow-down mt-3 bg-light">
            <p className=" form-head text-center text-orange">Center-Event Log</p>
          </header>
          < EventCenterList centerevent = {centerReturned.events}/>
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
    centerReturned: state.centers,
    centerId
  };
};

const mapDispatchToProps = dispatch => ({
  loadOneCenter: centerId => dispatch(loadOneCenter(centerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewCenterPage);
