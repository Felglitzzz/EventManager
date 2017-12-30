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
                <p className="display-3 text-center montezfont my-5 text-orange">
                Our Clients Say
                </p>
            </div>
            <div className="container">
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner h-auto">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="./img/me.jpg" className="img-fluid border-10 border-orange" />
                                </div>
                                <div className="col-md-10 d-flex align-items-center">
                                    <p className="text-center lead ">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nunc auctor, malesuada est eu, pellentesque nisi. Nam in enim lacinia, hendrerit neque non, placerat quam.Mauris eu tortor congue purus congue iaculis sit amet tincidunt neque. 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="./img/me.jpg" className="img-fluid border-10 border-orange" />
                                </div>
                                <div className="col-md-10 d-flex align-items-center">
                                    <p className="text-center lead ">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nunc auctor, malesuada est eu, pellentesque nisi. Nam in enim lacinia, hendrerit neque non, placerat quam.Mauris eu tortor congue purus congue iaculis sit amet tincidunt neque. 
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="./img/me.jpg" className="img-fluid border-10 border-orange" />
                                </div>
                                <div className="col-md-10 d-flex align-items-center">
                                    <p className="text-center lead ">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nunc auctor, malesuada est eu, pellentesque nisi. Nam in enim lacinia, hendrerit neque non, placerat quam.Mauris eu tortor congue purus congue iaculis sit amet tincidunt neque. 
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
