import React from "react";

export default class ErrorPage extends React.Component {
  componentDidMount() {
    $("#test").on("focusout", function() {
      alert("sdfsd");
    });
  }
  render() {
    return (
      <div id="test">
       
      </div>
    );
  }
}
