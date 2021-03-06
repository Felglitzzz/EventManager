import React from 'react';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import About from './About/About';
import Footer from './Footer/Footer';


/**
 * class App
 * React Component for Landing page
 */
export default class App extends React.Component {
/**
 * @return {react} react components
 */
  render() {
    return (
      <div>
        <Navbar />
        <Home />
        <About />
        <Footer />
      </div>
    );
  }
}
