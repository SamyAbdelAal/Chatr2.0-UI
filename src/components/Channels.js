import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import { Image } from "react-bootstrap";
import Box from "react-chat-box";
import PostMessage from "./PostMessage";
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      moment: moment()
    };
  }
  Something(message) {
    let al = "left";
    if (message.username == this.props.user.username) {
      al = "right";
    }
    let conversation = [
      {
        message: ` ${message.username}: ${message.message}`,
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
      this.props.fetchChannelMessages(this.props.match.params.channelID);
      this.props.fetchChannel(this.props.match.params.channelID);
    }, 2000);
  }
  componentDidUpdate(prevProps) {
    if (!this.props.user) {
      this.props.history.push("/");
    }
    // this.props.fetchChannelMessages(this.props.match.params.channelID);
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.props.fetchChannelMessages(this.props.match.params.channelID);
      this.props.fetchChannel(this.props.match.params.channelID);
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleChange = moment => {
    this.setState({
      moment: moment
    });

    this.props.filterMessages(
      this.props.match.params.channelID,
      moment.format("YYYY-MM-DDTHH:mm")
    );
    console.log(this.state.moment.format("YYYY-MM-DDTHH:mm:ss"));
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, "days"),
      Clear: ""
    };

    const channelID = this.props.match.params.channelID;
    return (
      <div className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          <h1 className="mb-1">
            WELCOME TO #{this.props.channel.name} Channel
          </h1>

          {this.props.user && (
            <div>
              <DatetimePickerTrigger
                shortcuts={shortcuts}
                moment={this.state.moment}
                onChange={this.handleChange}
              >
                <input
                  type="text"
                  value={this.state.moment.format("YYYY-MM-DD HH:mm")}
                  readOnly
                />
              </DatetimePickerTrigger>
              {this.props.channel.image_url && (
                <img
                  src={this.props.channel.image_url}
                  className="img img-thumbnail "
                  style={{ width: "350px", heigt: "350px" }}
                />
              )}
              <div style={{ overflowY: "scroll", height: "500px" }}>
                {this.props.messages.map(message => this.Something(message))}
              </div>

              <PostMessage channelID={channelID} />
            </div>
          )}
        </div>
        <div className="overlay z-0" />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fecthChannels: () => dispatch(actionCreators.fetchChannels()),
    fetchChannelMessages: channelID =>
      dispatch(actionCreators.fetchChannelMessages(channelID)),
    filterMessages: (channelID, timeStamp) =>
      dispatch(actionCreators.filterMessages(channelID, timeStamp)),
    fetchChannel: channelID => dispatch(actionCreators.fetchChannel(channelID))
  };
};
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user,
  messages: state.channelMessages.messages,
  channel: state.channels.channel,
  filteredMessages: state.channels.filteredMessages
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels);
