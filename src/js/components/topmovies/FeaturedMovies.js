import React, { Component } from "react";
import FeaturedMovie from "./FeaturedMovie";
import OwlCarousel from "react-owl-carousel";
import movielistImage from '../../../img/movieListFeatured.svg';

let dragging = false;
export default class FeaturedMovies extends React.Component {
    nextClicked() {
        this.slider.next(3);
    }

    prevClicked() {
        this.slider.prev(3);
    }


    componentDidMount() {
        var width = $(window).width();
        if (width < 750) {
            $(".slide-next-container").css("display", "none");
            $(".slide-prev-container").css("display", "none");
        }
    }

    render() {
        var options = {
            rtl: true,
            loop: false,
            dots: false,
            margin: 0,
            responsive: {
                1000: {
                    items: 4,
                    slideBy: 4
                },
                1500: {
                    items: 5,
                    slideBy: 5
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
        width = Math.round(width * window.devicePixelRatio);
        var height = Math.round(width * 16 / 11);
        var margin = this.props.margin ? this.props.margin + "px" : "0px";
        return (
            <div class="slide-overlay" style={{ marginRight: margin, marginLeft: margin }}>

                <div class="featured-container">
                    <div class="featured-title-container">
                        <img src={movielistImage} style={{
                            width: '15px',
                            position: 'absolute',
                            right: '12.5%',
                            top: '13px'
                        }} />
                        <h5 class="featured-container-title-h">{this.props.title}</h5>
                    </div>
                    <div class="slide-next-container-featured">
                        <div class="slide-next-featured" onClick={this.nextClicked.bind(this)} />
                    </div>
                    <OwlCarousel
                        ref={inst => (this.slider = inst)}
                        className="owl-theme"
                        {...options}
                        style={{
                            width: "75%",
                            marginLeft: "12.5%"
                        }}
                    >
                        {this.props.movies.map(movie => (
                            <FeaturedMovie
                                analyticsId={this.props.analyticsId}
                                analyticsLabel={this.props.analyticsLabel}
                                analyticsAction={this.props.analyticsAction}
                                analyticsCategory={this.props.analyticsCategory}
                                width={width}
                                height={height}
                                key={movie.id}
                                movie={movie}
                            />
                        ))}
                    </OwlCarousel>

                    <div class="slide-prev-container-featured">
                        <div class="slide-prev-featured" onClick={this.prevClicked.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
