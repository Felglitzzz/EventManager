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
                        <img src="../../../public/img/felglitz.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/awardy.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/userevent.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/texas.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/wed.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/felglitz.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/awardy.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/texas.jpg" className="img-fluid" />
                    </div>
                    <div className="box zoom">
                        <img src="../../../public/img/wed.jpg" className="img-fluid" />
                    </div>
                </div>
            </section>
        </div>
    );
  }
}
