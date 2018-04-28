import React from 'react';
/**
 * Portfolio Class
 */
export default class Portfolio extends React.Component {
  /**
   * Nav
   * @returns {react} Portfolio components
   */
  render() {
    return (
      <div>
        <section className="fill_screen">
          <div className="container-fluid">
            <p className="display-3 text-center text-orange pt-5 pb-3 homefont" id="discover">
              Discover Centers
            </p>
          </div>
          <div className="container">
            <div className="row">
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-down-right"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg"
                  className="img-fluid"
                />
              </div>
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="zoom-in-down"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg"
                  className="img-fluid"
                />
              </div>
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-down-left"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="row">
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-right"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/texas_i8mp46.jpg"
                  className="img-fluid"
                />
              </div>
              <div className="col-sm-12 col-md-4 margT margTl" data-aos="zoom-in" data-aos-duration="2000">
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/wed_qgkzve.jpg"
                  className="img-fluid"
                />
              </div>
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-left"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg"
                  className="img-fluid"
                />
              </div>
            </div>

            <div className="row pb-5">
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-up-right"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg"
                  className="img-fluid"
                />
              </div>
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="zoom-in-up"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/texas_i8mp46.jpg"
                  className="img-fluid"
                />
              </div>
              <div
                className="col-sm-12 col-md-4 margT margTl"
                data-aos="fade-up-left"
                data-aos-duration="2000"
              >
                <img
                  src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/wed_qgkzve.jpg"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
