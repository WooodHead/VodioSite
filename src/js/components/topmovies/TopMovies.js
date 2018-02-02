import React, { Component } from "react";

import TopMovie from "./TopMovie";

export default class TopMovies extends React.Component {
  componentDidMount() {
    $(".multiple-items" + this.props.id).slick({
      infinite: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      arrows: false,
      rtl: true,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    });
  }

  nextClicked() {
    $(".multiple-items" + this.props.id).slick("slickNext");
  }

  prevClicked() {
    $(".multiple-items" + this.props.id).slick("slickPrev");
  }

  render() {
    return (
      <div class="slide-overlay">
        <div class="top-moviez-slide-title-background">
          <h5 class="top-moviez-slide-title">{this.props.title}</h5>
        </div>
        <div class="slide-next-container">
          <div class="slide-next" onClick={this.nextClicked.bind(this)} />
        </div>
        <div className={"multiple-items" + this.props.id + " top-moviez-slick"}>
          {this.props.movies.map(movie => (
            <TopMovie key={movie.id} movie={movie} />
          ))}
        </div>
        <div class="slide-prev-container">
          <div class="slide-prev" onClick={this.prevClicked.bind(this)} />
        </div>
      </div>
    );
  }
}
