import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SplitText from "react-pose-text";

class ChannelPage extends Component {
  render() {
    const wordPoses = {
      draggable: true
    };

    const charPoses = {
      drag: {
        y: 0,
        transition: ({ charInWordIndex }) => ({
          type: "spring",
          velocity: 100 * Math.sin(1 + charInWordIndex),
          damping: 0
        })
      },
      dragEnd: {
        y: 0,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 1000
        }
      }
    };
    return (
      <div className=" d-flex channel">
        {!this.props.user && <Redirect to="/welcome" />}
        <div
          className="container text-center my-auto z-1 "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <h1>
            <SplitText wordPoses={wordPoses} charPoses={charPoses}>
              WELCOME TO TOWNiee
            </SplitText>
          </h1>
          <h1 className="mb-1" />

          <div>
            <h3 className="mb-5">
              <em>
                <SplitText wordPoses={wordPoses} charPoses={charPoses}>
                  See what's the talk of the towns
                </SplitText>
              </em>
            </h3>
          </div>
        </div>
        <div className="overlay z-0" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(connect(mapStateToProps)(ChannelPage));
