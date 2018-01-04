import React from "react";
import "../../../css/loading.css";

export default class Loading extends React.Component {
  render() {
    return (
      <div className="cssload-thecube-container">
        <div class="cssload-thecube">
          <div class="cssload-cube cssload-c1" />
          <div class="cssload-cube cssload-c2" />
          <div class="cssload-cube cssload-c4" />
          <div class="cssload-cube cssload-c3" />
        </div>
      </div>
    );
  }
}
