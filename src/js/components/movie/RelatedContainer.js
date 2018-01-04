import React, { Component } from 'react';
import Realated from "./Related";

export default class RelatedContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      relatedMovies: null
    };
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://localhost:58583/related.ashx?movieId=" + this.props.movieId,
      success: function(data, textStatus, request) {
        this.setState({ relatedMovies: data.data });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  onNextClick(){
    this.refs.relatedContainer.next();
  }

  onPrevClick(){
    this.refs.relatedContainer.prev();
  }


  render() {
    if (this.state.relatedMovies == null) {
      return null;
    } else {
      return (
        <div>
          <div className="single-product-moviez-popular-header">
            <span className="icon-video spacail-products-icon" />
            <strong className="spacail-products-title">محصولات مشابه</strong>
            <div className="spacail-products-control">
              <a id="prev3" className="prev" onClick={this.onNextClick.bind(this)}>
                <span className="icon-angle-left" />
              </a>{" "}
              <a id="next3" className="next" onClick={this.onPrevClick.bind(this)}>
                <span className="icon-angle-right" />
              </a>
            </div>
          </div>
          <Realated ref="relatedContainer" relatedMovies={this.state.relatedMovies} />
        </div>
      );
    }
  }
}
