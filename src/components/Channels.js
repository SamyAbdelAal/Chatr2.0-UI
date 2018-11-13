import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import { Image } from "react-bootstrap";
import Box from "react-chat-box";
import PostMessage from "./PostMessage";
import moment from "moment";
import Loading from "./Loading";
import DateTimePicker from "react-datetime-picker";
import ZoomImg from "./ZoomImg";
import Music from "./Sound";

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      date: new Date(),
      time: "",
      note: false
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
      // this.props.fetchChannelMessages(this.props.match.params.channelID, "");
      // this.props.filterMessages(
      //   this.props.match.params.channelID,
      //   moment.format("YYYY-MM-DDTHH:mm")
      // );
      // this.props.fetchChannelMessages(this.props.match.params.channelID);

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
    // console.log(prevProps.messages.length);
    // console.log("state" + this.props.messages.length);
    // if (prevProps.messages.length !== this.props.messages.length) {
    //   this.setState({ note: true });
    // } else {
    //   this.setState({ note: false });
    // }
    // this.props.fetchChannelMessages(this.props.match.params.channelID, "");
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      // if (prevProps.messages === this.props.messages)
      //   this.props.fetchChannelMessages(
      //     this.props.match.params.channelID,
      //     this.state.moment.format("YYYY-MM-DDTHH:mm")
      //   );
      // else if (prevProps.messages !== this.props.messages)
      // if (this.state.moment !== "") {
      //   this.props.fetchChannelMessages(
      //     this.props.match.params.channelID,
      //     this.state.moment.format("YYYY-MM-DDTHH:mm")
      //   );
      // } else {
      this.props.fetchChannelMessages(
        this.props.match.params.channelID,
        this.state.time
      );
      // }

      // this.props.filterMessages(
      //   this.props.match.params.channelID,
      //   this.state.moment.format("YYYY-MM-DDTHH:mm")
      // );
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

    // this.props.filterMessages(
    //   this.props.match.params.channelID,
    //   moment.format("YYYY-MM-DDTHH:mm")
    // );
    // console.log(this.state.moment.format("YYYY-MM-DDTHH:mm:ss"));
  };
  onChange = date => {
    console.log(date);
    let time = "";
    if (date !== null) {
      time = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}T${date.getHours() - 3}:${date.getMinutes()}`;

      this.setState({
        date: date,
        time: time
      });
    } else {
      this.setState({
        date: date,
        time: ""
      });
    }
  };

  render() {
    const shortcuts = {
      Today: moment(),
      Yesterday: moment().subtract(1, "days"),
      Clear: moment("2010-11-13T09:15:22")
    };

    const channelID = this.props.match.params.channelID;
    if (this.props.loading) {
      return <Loading />;
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
                    /*<img
                      src={this.props.channel.image_url}
                      className="img img-thumbnail "
                      style={{ width: "350px", heigt: "350px" }}
                    />*/
                    <ZoomImg
                      imageWidth={350}
                      imageHeight={350}
                      className="img img-thumbnail"
                      src={this.props.channel.image_url}
                    />
                  )}
                  <div>
                    <DateTimePicker
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div>
                  <div style={{ overflowY: "scroll", height: "500px" }}>
                    {this.props.messages.map(message =>
                      this.Something(message)
                    )}
                  </div>

                  <PostMessage channelID={channelID} />
                  <Music note={this.state.note} />
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
    fecthChannels: () => dispatch(actionCreators.fetchChannels()),
    fetchChannelMessages: (channelID, timeStamp) =>
      dispatch(actionCreators.fetchChannelMessages(channelID, timeStamp)),
    filterMessages: (channelID, timeStamp) =>
      dispatch(actionCreators.filterMessages(channelID, timeStamp)),
    fetchChannel: channelID => dispatch(actionCreators.fetchChannel(channelID)),
    setLoading: () => dispatch(actionCreators.setLoading())
  };
};
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user,
  messages: state.channelMessages.messages,
  channel: state.channels.channel,
  filteredMessages: state.channels.filteredMessages,
  loading: state.channelMessages.loading
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Channels)
);
