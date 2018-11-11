import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const channel = this.props.channels.map(channel => (
      <NavLink className="nav-link" to={`/channels/${channel.id}`}>
        <FontAwesomeIcon icon={faHashtag} />
        <span className="nav-link-text"> {channel.name}</span>
      </NavLink>
    ));
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={this.props.channel.name}
      >
        {/*
        <NavLink
          className="nav-link"
          to={`/channels/${this.props.channel.name}`}
        >
          <FontAwesomeIcon icon={faHashtag} />
          <span className="nav-link-text"> {this.props.channel.name}</span>
        </NavLink>
        */}
        {channel}
      </li>
    );
  }
}
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user
});
export default connect(mapStateToProps)(ChannelNavLink);
