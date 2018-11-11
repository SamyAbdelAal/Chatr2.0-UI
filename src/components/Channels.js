import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import { Image } from "react-bootstrap";
import Box from "react-chat-box";
import PostMessage from "./PostMessage";
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
    // const channelsList = this.props.messages.map(
    //   message => `${message.username}: ${message.message} `
    // );
    const channel = this.props.match.params.channelID;
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          {this.props.user && (
            <ul>
              {this.props.messages.map(message => (
                <li key={message.id}>
                  {message.username}: {message.message}
                </li>
              ))}
            </ul>
          )}
          {this.Something({ message: "he" })}
        </div>
        <div className="overlay z-0" />

        <PostMessage channelID={channel} />
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
