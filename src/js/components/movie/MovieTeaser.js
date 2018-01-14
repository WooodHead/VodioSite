import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";
import * as HLS from "videojs-contrib-hls";

export default class MovieTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: null,
      researcher: null,
      actors: null,
      provider: null,
      loadPage: false
    };
  }

  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      height: 200,
      width: 100,
      sources: [
        {
          src:
            "http://media.vodio.ir/StreamTokenHandler.ashx?token=D279F8F1-3A49-4676-91BE-3741AEDEFBB7&movieId=1",
          type: "application/x-mpegURL"
        }
      ]
    };

    return <VideoPlayer {...videoJsOptions} />;
  }
}
