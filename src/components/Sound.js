import React, { Component } from "react";
import { Link } from "react-router-dom";
import note from "../Sound/stairs.mp3";
class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = { play: false };
    this.url = note;
    this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay(note) {
    note ? this.audio.play() : this.audio.pause();
    return null;
  }

  render() {
    return this.togglePlay(this.props.note);
  }
}

export default Music;
