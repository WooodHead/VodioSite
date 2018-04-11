import React, { Component } from "react";
import AgentMovie from "./AgentMovie";
import movielistImage from '../../../img/movieList.svg';
import $ from 'jquery';
import Slider from 'react-slick'


export default class AgentMovies extends React.Component {
  nextClicked() {
    this.slider.next();
  }

  prevClicked() {
    this.slider.prev();
  }


  componentDidMount() {
    var width = window.innerWidth
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
      rtl: true,
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
      }]
    }
    var margin = this.props.margin ? this.props.margin + "px" : "0px"

    return (
      <div className="slide-overlay" style={{ marginRight: margin, marginLeft: margin, direction: 'rtl' }}>
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
          <h5 className="top-moviez-slide-title">{this.props.title}</h5>
        </div>
        <Slider className="max-width-banner" {...settings} style={{ display: 'flex' }}>
          {this.props.movies.map((movie, l) => (
            <AgentMovie
              analyticsId={this.props.analyticsId}
              analyticsLabel={this.props.analyticsLabel}
              analyticsAction={this.props.analyticsAction}
              analyticsCategory={this.props.analyticsCategory}
              key={movie.id}
              movie={movie}
              elementId={movie.id + l + this.props.elementId}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
