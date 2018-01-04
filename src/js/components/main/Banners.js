import React from "react";

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
          src={"http://localhost:58583/image.ashx?file=" + banner.url}
        />
      );
    });

    return <div class="banners">{components}</div>;
  }
}
