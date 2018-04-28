import React from 'react';
/**
 * About Class
 */
export default class About extends React.Component {
  /**
   * Nav
   * @returns {react} About components
   */
  render() {
    return (
      <div className="container-fluid">
        <div className="my-5 mx-5 no-margin-hr">
          <p className="display-3 text-center text-orange homefont">What we do</p>
          <p className="text-center lead testfont">
            We are the leading event technology platform in Africa. We cover your event and make it
            more
            <span className="text-orange">
              {' '}
              <u>colourful</u>.{' '}
            </span>
            Our technology is a foremost and deft custodian for your events.
          </p>
        </div>
      </div>
    );
  }
}
