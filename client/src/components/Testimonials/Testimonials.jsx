import React from 'react';
/**
 * Home Class
 */
export default class Testimonials extends React.Component {
  /**
   * class Testimonials
   * @returns {react} Testimonials components
   */
  render() {
    return (
      <div>
        <div className="container-fluid">
          <p className="display-3 text-center mt-5 text-orange homefont">Our Clients Say</p>
        </div>
        <div className="container" data-aos="zoom-in" data-aos-duration="2000">
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner h-auto">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-sm-12 col-md-2 text-center">
                    <img
                      src="http://res.cloudinary.com/felglitz/image/upload/v1515539305/me_xqrngf.jpg"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-sm-12 col-md-10 mAuto myAuto">
                    <p className="text-center lead margT testfont">
                      They helped me through out my wedding even after I booked a venue with them.
                      Event Manager has evolved and Eventeria are the leading pack.
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-sm-12 col-md-2 text-center">
                    <img
                      src="http://res.cloudinary.com/felglitz/image/upload/v1515539305/me_xqrngf.jpg"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-sm-12 col-md-10 mAuto myAuto">
                    <p className="text-center lead margT testfont">
                      I am glad I came across Eventeria and the sincerity with which I was served. I
                      will be more than glad to recommend their services
                    </p>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-sm-12 col-md-2 text-center">
                    <img
                      src="http://res.cloudinary.com/felglitz/image/upload/v1515539305/me_xqrngf.jpg"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-sm-12 col-md-10 mAuto myAuto">
                    <p className="text-center lead margT testfont">
                      I'm really happy about their service. Awesome customer service and their staff
                      was very patient with me even with all my requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
