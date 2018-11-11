import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";
// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channels from "./components/Channels";

class App extends Component {
  componentDidMount() {
    this.props.fetchChannels();
  }
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/channels/:channelID" component={Channels} />
          <Route path="/channels" component={Channels} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchChannelMessages: () => dispatch(actionCreators.fetchChannelMessages()),
    fetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
