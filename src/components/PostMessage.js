import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-group">
        <input
          className="form-control"
          type="text"
          name="message"
          placeholder="Enter message here..."
          onChange={this.onTextChange}
          value={this.state.message}
        />
        <input type="submit" value="Add Message" className="btn btn-success" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(actionCreators.postMessage(message, channelID))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostMessage);
