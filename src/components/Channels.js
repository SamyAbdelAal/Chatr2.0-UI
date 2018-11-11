import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

class Channels extends Component {
  componentDidMount() {
    this.props.fecthChannels();
    console.log(this.props.channels);
  }

  render() {
    const channelsList = this.props.channels.map(channel => (
      <div>
        <h6 key={channel.id}>{channel.name}</h6>
        <img src={channel.image_url} responsive />
      </div>
    ));
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          {!this.props.user && (
            <div>
              <h3 className="mb-5">
                <em>You're gonna need to login to see the messages</em>
              </h3>
              <Link to="/login" className="btn btn-primary btn-lg">
                Login
              </Link>
            </div>
          )}
          {channelsList}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fecthChannels: () => dispatch(actionCreators.fetchChannels())
  };
};
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
