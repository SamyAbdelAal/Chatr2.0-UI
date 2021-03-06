import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
class Welcome extends Component {
  render() {
    return (
      <div className=" d-flex welcome">
        <div
          className="d-flex  w-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="container text-center my-auto z-1">
            <h1 className="mb-1">WELCOME STRANGER</h1>
            {!this.props.user ? (
              <div>
                <h3 className="mb-5">
                  <em>You're gonna need to login to see the messages</em>
                </h3>
                <Link to="/login" className="btn btn-primary btn-lg">
                  Login
                </Link>
              </div>
            ) : (
              <Redirect to="/channels" />
            )}
          </div>
        </div>
        <div className="overlay z-0" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Welcome);
