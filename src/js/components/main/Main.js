import React, { Component } from "react";
import TopMovies from "../topmovies/TopMovies";
import Banners from "./Banners";
import {MainUrl} from "../../util/RequestHandler";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    console.log(MainUrl + "/home.ashx");
    $.ajax({
      type: "GET",
      url: MainUrl + "/home.ashx",
      success: function(data, textStatus, request) {
        this.setState({ result: data });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  render() {
    if (this.state.result == null) {
      return <div />;
    } else if (this.state.result == null) {
      return <div />;
    } else {
      var components = [];
      this.state.result.data.bundles.forEach((bundle, l) => {
        if (bundle.type == 2) {
          components.push(
            <TopMovies
              key={l}
              movies={bundle.movies}
              id={bundle.id}
              title={bundle.title}
            />
          );
        } else if (bundle.type == 1) {
          components.push(<Banners key={l} bundle={bundle} />);
        }
      });

      return <div>{components}</div>;
    }
  }
}
