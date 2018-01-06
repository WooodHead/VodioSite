import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";

export default class MovieTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: null,
      researcher: null,
      actors: null,
      provider: null,
      loadPage: false
    };
  }

  componentDidMount() {}

  render() {
    return <div />;
  }
}
