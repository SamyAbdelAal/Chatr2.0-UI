import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import { Image } from "react-bootstrap";
import Box from "react-chat-box";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  Something(props) {
    return (
      <div>
        <Box />
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchChannelMessages(this.props.match.params.channelID);
  }
  componentDidUpdate() {
    this.props.fetchChannelMessages(this.props.match.params.channelID);
  }
  render() {
    // console.log(this.props.match.url.substring(1));
    const channelsList = this.props.messages.map(messages => (
      <div>{messages.message}</div>
    ));
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          {this.props.user && channelsList}

          {this.Something({ message: "he" })}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fecthChannels: () => dispatch(actionCreators.fetchChannels()),
    fetchChannelMessages: channelID =>
      dispatch(actionCreators.fetchChannelMessages(channelID))
  };
};
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user,
  messages: state.channelMessages.messages
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
