import React from "react";
import MainUrl from '../../util/RequestHandler'

export default class Banners extends React.Component {
  componentDidMount() {
    $(".banners").slick({
      infinite: true,
      speed: 300,
      autoPlay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      rtl: true,
      dots: true
    });
  }
  render() {
    var components = [];
    this.props.bundle.banners.forEach((banner, l) => {
      components.push(
        <img
          key={l}
          src={MainUrl + "/image.ashx?file=" + banner.url}
        />
      );
    });

    return <div class="banners">{components}</div>;
  }
}
