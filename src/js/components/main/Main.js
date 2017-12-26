import React from "react";
import axios from "axios";
import TopMovies from "./TopMovies";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      result: null
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://localhost:58583/home.ashx",
      success: function(data, textStatus, request) {
        this.setState({ result: data });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  render() {
    if (this.state.result == null) {
      console.log("!");
      return <div />;
    } else if (this.state.result == null) {
      console.log("@");
      return <div />;
    } else {
      console.log("#");
      return (
        <div>
          {this.state.result.data.bundles.map(
            (bundle, l) =>
              bundle.type == 0 ? <TopMovies key={l} bundle={bundle} /> : null
          )}
        </div>
      );
    }
  }
}
