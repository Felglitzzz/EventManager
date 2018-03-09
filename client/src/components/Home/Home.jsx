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
        <div className="container-fluid fill_screen img-fluid d-flex align-items-center">
          <div id="carouselExampleSlidesOnly"
            className="container-fluid carousel slide"
            data-ride="carousel">
            <div className="carousel-inner h-auto">
              <div className="carousel-item active">
                <p className="text-center text-light montezfont display-4">
                                We help your event communicate beauty
                </p>
              </div>
              <div className="carousel-item">
                <p className="text-center text-light montezfont display-4">
                                Event Management has evolved and we are the leading pack
                </p>
              </div>
              <div className="carousel-item">
                <p className="text-center text-light montezfont display-4">
                                Your events, Amplified! Managing It, Simplified!
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <a
                className="d-flex marg btn border-white btn-outline-orange aconform text-white px-5"
                href="#discover"
                type="button">Explore</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

