import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AddChannelForm from "../AddChannelForm";
// import Modal from "react-responsive-modal";
import ChannelForm from "../ChannelForm";
import posed, { PoseGroup } from "react-pose";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

const Modal = posed.div({
  enter: {
    y: 350,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, open: false };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }
  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.id} channel={channel} />
    ));
    const { open } = this.state;

    if (!this.props.user) {
      return null;
    } else {
      return (
        <div>
          <PoseGroup>
            {open && [
              // If animating more than one child, each needs a `key`
              <Shade key="shade" className="shade" />,
              <Modal key="Modal" className="shade" center>
                <ChannelForm />
                <button className="btn" onClick={this.onCloseModal}>
                  close
                </button>
              </Modal>
            ]}
          </PoseGroup>

          <div>
            {this.props.user && (
              <ul
                className="navbar-nav navbar-sidenav"
                id="exampleAccordion"
                style={{ overflowY: "scroll", color: "red" }}
              >
                <li
                  className="nav-item"
                  data-toggle="tooltip"
                  data-placement="right"
                >
                  {this.props.user && (
                    <span className="nav-link " onClick={this.onOpenModal}>
                      <span className="nav-link-text mr-2">Channels</span>
                      <FontAwesomeIcon icon={faPlusCircle} />
                    </span>
                  )}
                </li>
                {channelLinks}
              </ul>
            )}
            <ul className="navbar-nav sidenav-toggler">
              <li className="nav-item">
                <span
                  className="nav-link text-center"
                  id="sidenavToggler"
                  onClick={() =>
                    this.setState(prevState => ({
                      collapsed: !prevState.collapsed
                    }))
                  }
                >
                  <FontAwesomeIcon
                    icon={this.state.collapsed ? faAngleRight : faAngleLeft}
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  channels: state.channels.channels,
  user: state.auth.user
});
export default withRouter(connect(mapStateToProps)(SideNav));
