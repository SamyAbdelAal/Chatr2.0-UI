import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top nav"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          TOWNiee
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <SideNav />
          <AuthButton />
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
