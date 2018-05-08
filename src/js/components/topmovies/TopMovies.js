import React, { Component } from "react";
import TopMovie from "./TopMovie";
import movielistImage from '../../../img/movieList.svg';
import Slider from 'react-slick'
import { inject, observer } from "mobx-react";

@inject("session")
@observer
export default class TopMovies extends React.Component {
  nextClicked() {
    this.slider.slickNext();
  }

  prevClicked() {
    this.slider.slickPrev();
  }


  componentDidMount() {
    var width = $(window).width();
    if (width < 750) {
      $(".slide-next-container").css("display", "none");
      $(".slide-prev-container").css("display", "none");
    }
  }

  render() {
    const settings = {
      dots: false,
      slidesToShow: 8,
      slidesToScroll: 8,
      arrows: false,
      rtl: false,
      responsive: [{
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 7,
        }
      }, {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        }
      }, {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      }],
      beforeChange: () => this.props.session.topMovieDragging = true,
      afterChange: () => this.props.session.topMovieDragging = false
    }
    var windowWidth = $(window).width();
    var width = 0;
    var parentWidth = '0';
    if (windowWidth > 1400) {
      width = Math.round(windowWidth / 8);
      parentWidth = 100 / 8 + '%';
    } else if (windowWidth > 1200) {
      width = Math.round(windowWidth / 7);
      parentWidth = 100 / 7 + '%';
    } else if (windowWidth > 1000) {
      width = Math.round(windowWidth / 6);
      parentWidth = 100 / 6 + '%';
    } else if (windowWidth > 600) {
      width = Math.round(windowWidth / 5);
      parentWidth = 100 / 5 + '%';
    } else {
      width = Math.round(windowWidth / 4);
      parentWidth = 100 / 4 + '%';
    }
    width = Math.round(width * window.devicePixelRatio);
    var height = Math.round(width * 16 / 11);
    var margin = this.props.margin ? this.props.margin + "px" : "0px";
    return (
      <div class="slide-overlay" style={{ marginRight: margin, marginLeft: margin }}>
        <div style={{
          position: 'relative',
          height: '30px',
          display: 'inline-flex',
          width: '100%'
        }}>
          <img src={movielistImage} style={{
            width: '15px',
            position: 'absolute',
            right: '5px',
            top: '13px'
          }} />
          <h5 class="top-moviez-slide-title">{this.props.title}</h5>
        </div>
        <div class="slide-next-container">
          <div class="slide-next" onClick={this.nextClicked.bind(this)} />
        </div>
        <Slider ref={c => this.slider = c} className="max-width-banner" {...settings} style={{ display: 'flex' }}>

          {this.props.movies.map(movie => (
            <TopMovie
              analyticsId={this.props.analyticsId}
              analyticsLabel={this.props.analyticsLabel}
              analyticsAction={this.props.analyticsAction}
              analyticsCategory={this.props.analyticsCategory}
              width={width}
              height={height}
              key={movie.id}
              movie={movie}
              title={this.props.title}
              parentWidth={parentWidth}
            />
          ))}
        </Slider>
        <div class="slide-prev-container">
          <div class="slide-prev" onClick={this.prevClicked.bind(this)} />
        </div>
      </div>
    );
  }
}
