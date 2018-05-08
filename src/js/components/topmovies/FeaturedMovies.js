import React, { Component } from "react";
import FeaturedMovie from "./FeaturedMovie";
import movielistImage from '../../../img/movieListFeatured.svg';
import Slider from 'react-slick';
import { inject, observer } from "mobx-react";

@inject("session")
@observer
export default class FeaturedMovies extends React.Component {
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
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows: false,
            rtl: false,
            infinite: false,
            responsive: [{
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }, {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }],
            beforeChange: () => this.props.session.featuredDragging = true,
            afterChange: () => this.props.session.featuredDragging = false
        }
        var windowWidth = $(window).width();
        var width = 0;
        var parentWidth = '0';
        if (windowWidth > 1300) {
            width = Math.round(windowWidth * 0.75 / 5);
            parentWidth = 100 / 5 + '%';
        } else if (windowWidth > 1000) {
            width = Math.round(windowWidth * 0.75 / 4);
            parent = 100 / 4 + '%';
        } else {
            width = Math.round(windowWidth * 0.75 / 3);
            parentWidth = 100 / 3 + '%';
        }
        width = Math.round($(window).width());
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
                    <Slider ref={c => this.slider = c} {...settings} className="featured-slider">
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
                                parentWidth={parentWidth}
                            />
                        ))}
                    </Slider>

                    <div class="slide-prev-container-featured">
                        <div class="slide-prev-featured" onClick={this.prevClicked.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}
