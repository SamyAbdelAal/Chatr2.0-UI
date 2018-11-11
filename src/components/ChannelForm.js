import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image_url: ""
    };
    this.submitChannel = this.submitChannel.bind(this);
    this.onTextchange = this.onTextchange.bind(this);
  }

  submitChannel(event) {
    event.preventDefault();
    this.props.postChannel(this.state);
  }

  onTextchange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.submitChannel}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Channel Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={this.onTextchange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Image URL</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="image_url"
            onChange={this.onTextchange}
          />
        </div>
        <input type="submit" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postChannel: newChannel => dispatch(actionCreators.postChannel(newChannel))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm);
