import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../../store/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

class AuthButton extends Component {
  render() {
    const { user } = this.props;
    let buttons;

    if (user) {
      buttons = (
        <li className="nav-item">
          <span className="nav-link" onClick={() => this.props.logout()}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </span>
        </li>
      );
    } else {
      buttons = [
        <li key="loginButton" className="nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>,
        <li key="signupButton" className="nav-item">
          <Link to="/signup" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        {<span className="navbar-text">{user && user.username}</span>}
        {buttons}
      </ul>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
