import "slick-carousel/slick/slick.css";
import React from "react";
import "slick-carousel";

import TopMovie from "./TopMovie";

export default class TopMovies extends React.Component {
  componentDidMount() {
    $(".multiple-items").slick({
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    console.log(this.props.movies);
  }

  render() {
    return (
      <div className="multiple-items top-moviez">
        {this.props.bundle.movies.map(movie => (
          <TopMovie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}
