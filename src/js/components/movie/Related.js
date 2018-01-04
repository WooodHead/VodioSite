import React, { Component } from 'react';
import { latinToPersian, convertMillisecondToString } from "../../util/util";
export default class Test extends React.Component {
  componentDidMount() {
    $(".related-items").slick({
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      rtl: true,
      adaptiveHeigth: true,
      responsive: [
        {
          breakpoint: 1241,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 741,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 521,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  next() {
    $(".related-items").slick("slickNext");
  }

  prev() {
    $(".related-items").slick("slickPrev");
  }

  render() {
    return (
      <div className="single-product-moviez-popular-inner">
        <div className="single-product-movie-popular related-items">
          {this.props.relatedMovies.map(movie => (
            <div key={movie.id} className="spmp-left">
              <div className="single-product-movie-popular-inner ">
                <a href="#">
                  <img
                    src={movie.thumbnail.url}
                    className="product-movie-inner"
                    alt="movie name"
                  />
                </a>
                <h3 className="spacail-product-title">
                  <a href="#">{movie.title}</a>
                </h3>
                <div className="spacail-product-meta">
                  <span>
                    <a href="#">{latinToPersian(movie.productionYear)}</a>
                  </span>{" "}
                  -{" "}
                  <span>
                    {latinToPersian(convertMillisecondToString(movie.duration))}
                  </span>{" "}
                  -{" "}
                  <span className="green">
                    <a href="#">{latinToPersian(movie.maxQuality)}</a>
                  </span>
                </div>
                <p className="spacail-product-price">
                  <span className="price-value">
                    {latinToPersian(movie.price)}
                  </span>
                </p>
                <a href="#" className="spacail-product-add">
                  خرید
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
