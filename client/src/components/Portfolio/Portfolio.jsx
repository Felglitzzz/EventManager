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
        <section className="bg-secondary">
          <div className="container-fluid">
            <p className="display-3 montezfont text-center text-orange pt-5 pb-3" id="discover">
                    Discover Events
            </p>
          </div>
          <div className="container wrap d-flex pb-5">
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/userevent_klrvuu.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/texas_i8mp46.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/wed_qgkzve.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/felglitz_y7kuvr.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539253/awardy_hqtlun.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/texas_i8mp46.jpg" className="img-fluid" />
            </div>
            <div className="box zoom">
              <img src="http://res.cloudinary.com/felglitz/image/upload/v1515539276/wed_qgkzve.jpg" className="img-fluid" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
