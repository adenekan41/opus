import React from 'react';
import './Navbar.css';
import logo from '../assets/img/Opuslogo.svg';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-light__opus">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="LOADING >>>>" style={{}} />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto" />
      </div>
    </nav>
  );
};

export default Navbar;
