import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import Box from "react-chat-box";
import PostMessage from "./PostMessage";

import DateTimePicker from "react-datetime-picker";
import ZoomImg from "./ZoomImg";

import AwesomeComponent from "./spinners";
import { change, chatBox } from "../functions";
class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      date: new Date(),
      time: ""
    };
  }
  ChatBox(message) {
    let al = "left";
    let messageTime = `${message.timestamp.substring(
      0,
      10
    )} ${message.timestamp.substring(11, 16)}`;
    if (message.username == this.props.user.username) {
      al = "right";
    }
    let conversation = [
      {
        message: ` ${message.username}: ${message.message} (${messageTime})`,
        avatar: this.props.user.image,
        alignment: al
      }
    ];
    return (
      <div key={message.id + 1}>
        <Box key={message.id + 1} conversation={conversation} />
      </div>
    );
  }
  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/");
    }
    this.interval = setInterval(() => {
      this.props.fetchChannel(this.props.match.params.channelID);
    }, 2000);
  }
  componentDidUpdate(prevProps) {
    if (!this.props.user) {
      this.props.history.push("/");
    }
    if (
      prevProps.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.setLoading();
    }
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.fetchChannelMessages(
        this.props.match.params.channelID,
        this.state.time
      );

      this.props.fetchChannel(this.props.match.params.channelID);
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTheState = date => {
    this.setState(change(date));
  };
  render() {
    const channelID = this.props.match.params.channelID;
    if (this.props.loading) {
      return (
        <div className="masthead my-5">
          <AwesomeComponent />
        </div>
      );
    } else {
      return (
        <div className="masthead d-flex chat h-100">
          <div
            className="d-flex w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            <div
              className="container text-center my-auto z-1 my-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                color: "black"
              }}
            >
              <h1 className="mb-1">
                WELCOME TO #{this.props.channel.name} Channel
              </h1>
              {this.props.user && (
                <div className="border">
                  {this.props.channel.image_url && (
                    <ZoomImg
                      imageWidth={350}
                      imageHeight={350}
                      className="img img-thumbnail"
                      src={this.props.channel.image_url}
                    />
                  )}
                  <div>
                    <DateTimePicker
                      onChange={this.setTheState}
                      value={this.state.date}
                      locale="en"
                    />
                  </div>
                  <div style={{ overflowY: "scroll", height: "500px" }}>
                    {this.props.messages.map(message => this.ChatBox(message))}
                  </div>

                  <PostMessage channelID={channelID} />
                </div>
              )}
            </div>
          </div>
          <div className="overlay z-0" />
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchChannelMessages: (channelID, timeStamp) =>
      dispatch(actionCreators.fetchChannelMessages(channelID, timeStamp)),
    fetchChannel: channelID => dispatch(actionCreators.fetchChannel(channelID)),
    setLoading: () => dispatch(actionCreators.setLoading())
  };
};
const mapStateToProps = state => ({
  user: state.auth.user,
  messages: state.channelMessages.messages,
  channel: state.channels.channel,
  loading: state.channelMessages.loading
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channels)
);
