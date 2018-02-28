import React, { Component } from "react";
import TopMovie from "./TopMovie";
import OwlCarousel from "react-owl-carousel";

let dragging = false;
export default class TopMovies extends React.Component {
  nextClicked() {
    this.slider.next();
  }

  prevClicked() {
    this.slider.prev();
  }

  render() {
    var options = {
      rtl: true,
      loop: false,
      dots: false,
      margin: 10,
      responsive: {
        600: {
          items: 4,
          slideBy: 4
        },
        1000: {
          items: 5,
          slideBy: 5
        },
        1200: {
          items: 6,
          slideBy: 6
        },
        1400: {
          items: 7,
          slideBy: 7
        },
        1700: {
          items: 8,
          slideBy: 8
        }
      }
    };
    var windowWidth = $(window).width();
    var width = 0;
    if (windowWidth > 1400) {
      width = Math.round(windowWidth / 7);
    } else if (windowWidth > 1000) {
      width = Math.round(windowWidth / 5);
    } else {
      width = Math.round(windowWidth / 3);
    }
    width = Math.round(width * 1.2);
    var height = Math.round(width * 16 / 11);
    return (
      <div class="slide-overlay">
        <div class="top-moviez-slide-title-background">
          <h5 class="top-moviez-slide-title">{this.props.title}</h5>
        </div>
        <div class="slide-next-container">
          <div class="slide-next" onClick={this.nextClicked.bind(this)} />
        </div>
        <OwlCarousel
          ref={inst => (this.slider = inst)}
          className="owl-theme"
          {...options}
          style={{
            marginRight: "15px",
            marginLeft: "15px",
            width: "calc(100% - 30px)"
          }}
        >
          {this.props.movies.map(movie => (
            <TopMovie
              width={width}
              height={height}
              key={movie.id}
              movie={movie}
            />
          ))}
        </OwlCarousel>
        <div class="slide-prev-container">
          <div class="slide-prev" onClick={this.prevClicked.bind(this)} />
        </div>
      </div>
    );
  }
}
