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
        <div>
            <div className="container-fluid my-5">
                <p className="display-3 montezfont text-center text-orange">
                What we do
                </p>
                <h3 className="text-center">
                We are the leading event technology platform in Africa.
                 We cover your event and make it more
                <span className="text-orange "> <u>colourful</u>. </span>
                Our technology is a foremost and deft custodian for your events.
                </h3>
            </div>
        </div>

    );
  }
}

