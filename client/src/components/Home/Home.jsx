import React from 'react';
/**
 * Home Class
 */
export default class Home extends React.Component {
  /**
   * componentDidMount
   * @returns { object } isAuthenticated
   */
  componentWillMount() {
    this.setState({ isAuthenticated: false });
  }
  /**
   * Nav
   * @returns {Home} Home components
   */
  render() {
    return (
      <div>
        <div className="container-fluid half_screen img-fluid d-flex align-items-center">
          <div
            className="container-fluid carousel slide"
            data-ride="carousel"
            id="carouselExampleSlidesOnly"
          >
            <div className="carousel-inner h-auto">
              <div className="carousel-item active">
                <p className="text-center text-light homefont">
                  We help your event communicate beauty
                </p>
              </div>
              <div className="carousel-item">
                <p className="text-center text-light homefont">
                  Your events, Amplified! Managing It, Simplified!
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <a
                className="d-flex marg btn border-white btn-outline-orange aconform text-white px-5"
                href="#discover"
                type="button"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
